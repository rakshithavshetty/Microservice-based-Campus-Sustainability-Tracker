const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Event extends Model {}

Event.init({
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: false,
});

module.exports = Event;