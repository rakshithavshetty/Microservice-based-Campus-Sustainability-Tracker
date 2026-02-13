const express = require('express');
const dotenv = require('dotenv');
const { Eureka } = require('eureka-js-client');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const rewardRoutes = require('./routes/rewardRoutes');
const healthRoutes = require('./routes/healthRoutes');
const sequelize = require('./models/index');

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/reward/health', healthRoutes);
app.use('/reward/rewards', rewardRoutes);

const PORT = process.env.PORT || 5004;

// Connect to DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Reward Service running on port ${PORT}`));

    // Eureka registration
    const eureka = new Eureka({
      instance: {
        app: 'reward-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'reward-service',
        instanceId: `127.0.0.1:reward-service:${PORT}`,
        statusPageUrl: `http://localhost:${PORT}/reward/health`,
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