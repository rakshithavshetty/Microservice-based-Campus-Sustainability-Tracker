const express = require('express');
const dotenv = require('dotenv');
const { Eureka } = require('eureka-js-client');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const eventRoutes = require('./routes/eventRoutes');
const healthRoutes = require('./routes/healthRoutes');
const sequelize = require('./models/index');

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/event/health', healthRoutes);
app.use('/event/events', eventRoutes);

const PORT = 5003;

// Connect to DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Event Service running on port ${PORT}`));

    // Eureka registration
    const eureka = new Eureka({
      instance: {
        app: 'event-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'event-service',
        instanceId: `127.0.0.1:event-service:${PORT}`,
        statusPageUrl: `http://localhost:${PORT}/event/health`,
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