const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class EnergyConsumption extends Model {}

EnergyConsumption.init({
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solarEnergy: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  kebEnergy: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalEnergy: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'EnergyConsumption',
  tableName: 'energy_consumption',
  timestamps: false,
});

module.exports = EnergyConsumption;