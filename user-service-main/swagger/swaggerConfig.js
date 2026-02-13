const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API - EcoCampus',
      version: '1.0.0',
      description: 'API documentation for User Microservice',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // 👈 Shows "JWT" in the Authorize button
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
