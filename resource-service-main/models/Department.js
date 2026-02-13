const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  classrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  labs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  fans: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  lights: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  computers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  cabins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  airConditioners: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'resource_departments',
  timestamps: false
});

module.exports = Department;