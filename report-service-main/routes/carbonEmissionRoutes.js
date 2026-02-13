const express = require('express');
const router = express.Router();
const carbonEmissionController = require('../controllers/carbonEmissionController');

// Get all carbon emissions by date (dd-mm-yyyy)
router.get('/by-date', carbonEmissionController.getAllCarbonEmissionsByDate);

// Get all carbon emissions by month (mm-yyyy)
router.get('/by-month', carbonEmissionController.getAllCarbonEmissionsByMonth);

module.exports = router;