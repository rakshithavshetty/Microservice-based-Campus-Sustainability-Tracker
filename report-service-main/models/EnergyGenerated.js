const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class EnergyGenerated extends Model {}

EnergyGenerated.init({
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solarEnergy: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'EnergyGenerated',
  tableName: 'energy_generated',
  timestamps: false,
});

module.exports = EnergyGenerated;