const express = require('express');
const dotenv = require('dotenv');
const { Eureka } = require('eureka-js-client');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const departmentRoutes = require('./routes/departmentRoutes');
const articleRoutes = require('./routes/articleRoutes');
const researchPaperRoutes = require('./routes/researchPaperRoutes');
const videoRoutes = require('./routes/videoRoutes');
const healthRoutes = require('./routes/healthRoutes');
const sequelize = require('./models/index');

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/resource/health', healthRoutes);
app.use('/resource/departments', departmentRoutes);
app.use('/resource/articles', articleRoutes);
app.use('/resource/research-papers', researchPaperRoutes);
app.use('/resource/videos', videoRoutes);

const PORT = process.env.PORT || 5005;

// Connect to DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Resource Service running on port ${PORT}`));

    // Eureka registration
    const eureka = new Eureka({
      instance: {
        app: 'resource-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'resource-service',
        instanceId: `127.0.0.1:resource-service:${PORT}`,
        statusPageUrl: `http://localhost:${PORT}/resource/health`,
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
      },
    });

    eureka.start();
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1);
  });