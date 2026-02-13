const WaterConsumption = require('../models/WaterConsumption');

// Get all water consumption by month (mm-yyyy)
exports.getAllWaterConsumptionByMonth = async (req, res) => {
  try {
    const records = await WaterConsumption.findAll({
      order: [['month', 'ASC']]
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};