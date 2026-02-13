const EnergyConsumption = require('../models/EnergyConsumption');

// Get all energy consumption by month (mm-yyyy)
exports.getAllEnergyConsumptionByMonth = async (req, res) => {
  try {
    const records = await EnergyConsumption.findAll({
      order: [['month', 'ASC']]
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};