const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class WaterConsumption extends Model {}

WaterConsumption.init({
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waterConsumedLitres: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'WaterConsumption',
  tableName: 'water_consumption',
  timestamps: false,
});

module.exports = WaterConsumption;