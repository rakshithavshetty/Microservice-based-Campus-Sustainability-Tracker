const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const carbonEmissionRoutes = require('./routes/carbonEmissionRoutes');
const waterConsumptionRoutes = require('./routes/waterConsumptionRoutes');
const energyConsumptionRoutes = require('./routes/energyConsumptionRoutes');
const energyGeneratedRoutes = require('./routes/energyGeneratedRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/health', healthRoutes);
app.use('/carbon-emission', carbonEmissionRoutes);
app.use('/water-consumption', waterConsumptionRoutes);
app.use('/energy-consumption', energyConsumptionRoutes);
app.use('/energy-generated', energyGeneratedRoutes);

module.exports = app;