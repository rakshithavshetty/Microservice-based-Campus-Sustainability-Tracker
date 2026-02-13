const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('videos'),
    allowNull: false,
    defaultValue: 'videos'
  }
}, {
  tableName: 'resource_videos',
  timestamps: false
});

module.exports = Video;