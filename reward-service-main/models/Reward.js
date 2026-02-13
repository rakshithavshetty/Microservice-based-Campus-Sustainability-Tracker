const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Reward extends Model {}

Reward.init({
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reward',
  tableName: 'rewards',
  timestamps: false,
});

module.exports = Reward;