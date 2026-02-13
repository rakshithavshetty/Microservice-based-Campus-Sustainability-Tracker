const express = require('express');
const dotenv = require('dotenv');
const { Eureka } = require('eureka-js-client');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const healthRoutes = require('./routes/healthRoutes');
const carbonEmissionRoutes = require('./routes/carbonEmissionRoutes');
const waterConsumptionRoutes = require('./routes/waterConsumptionRoutes');
const energyConsumptionRoutes = require('./routes/energyConsumptionRoutes');
const energyGeneratedRoutes = require('./routes/energyGeneratedRoutes');
const sequelize = require('./models/index'); // Sequelize config

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/report/health', healthRoutes);
app.use('/report/carbon-emissions', carbonEmissionRoutes);
app.use('/report/water-consumption', waterConsumptionRoutes);
app.use('/report/energy-consumption', energyConsumptionRoutes);
app.use('/report/energy-generated', energyGeneratedRoutes);

const PORT = 5001;

// Connect to DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Report Service running on port ${PORT}`));

    // Eureka registration
    const eureka = new Eureka({
      instance: {
        app: 'report-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'report-service',
        instanceId: `127.0.0.1:report-service:${PORT}`,
        statusPageUrl: `http://localhost:${PORT}/report/health`,
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