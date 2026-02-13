const CarbonEmission = require('../models/CarbonEmission');
const { Sequelize } = require('sequelize');

// Get all carbon emissions by date (dd-mm-yyyy)
exports.getAllCarbonEmissionsByDate = async (req, res) => {
  try {
    const records = await CarbonEmission.findAll({
      order: [['date', 'ASC']]
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all carbon emissions grouped by month (mm-yyyy)
exports.getAllCarbonEmissionsByMonth = async (req, res) => {
  try {
    const records = await CarbonEmission.findAll({
      attributes: [
        'month',
        [Sequelize.fn('SUM', Sequelize.col('noOfVehicles')), 'totalVehicles'],
        [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('noOfVehicles'))), 'avgVehiclesDaily'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'daysCount']
      ],
      group: ['month'],
      order: [['month', 'ASC']]
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};