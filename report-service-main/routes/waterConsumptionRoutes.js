const express = require('express');
const router = express.Router();
const waterConsumptionController = require('../controllers/waterConsumptionController');

// Get all water consumption by month (mm-yyyy)
router.get('/', waterConsumptionController.getAllWaterConsumptionByMonth);

module.exports = router;