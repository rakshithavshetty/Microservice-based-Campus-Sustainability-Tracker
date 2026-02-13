const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const ResearchPaper = sequelize.define('ResearchPaper', {
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
    type: DataTypes.ENUM('research-papers'),
    allowNull: false,
    defaultValue: 'research-papers'
  }
}, {
  tableName: 'resource_research_papers',
  timestamps: false
});

module.exports = ResearchPaper;