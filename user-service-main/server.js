const express = require('express');
const dotenv = require('dotenv');
const { Eureka } = require('eureka-js-client');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db'); // Sequelize MySQL config

dotenv.config();

const app = express();
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MySQL via Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Connected');
    return sequelize.sync(); // sync models
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 User Service running on port ${PORT}`));

    // Eureka registration
    const eureka = new Eureka({
      instance: {
        app: 'user-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'user-service',
        instanceId: `127.0.0.1:user-service:${PORT}`,
        statusPageUrl: `http://127.0.0.1:${PORT}/user/`,
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
