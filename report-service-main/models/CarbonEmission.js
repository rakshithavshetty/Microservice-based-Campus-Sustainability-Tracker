const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class CarbonEmission extends Model {}

CarbonEmission.init({
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noOfVehicles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CarbonEmission',
  tableName: 'carbon_emissions',
  timestamps: false,
});

module.exports = CarbonEmission;