const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({ order: [['name', 'ASC']] });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};