const express = require('express');
const router = express.Router();
const energyConsumptionController = require('../controllers/energyConsumptionController');

// Get all energy consumption by month (mm-yyyy)
router.get('/', energyConsumptionController.getAllEnergyConsumptionByMonth);

module.exports = router;