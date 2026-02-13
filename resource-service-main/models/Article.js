const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Article = sequelize.define('Article', {
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
    type: DataTypes.ENUM('articles'),
    allowNull: false,
    defaultValue: 'articles'
  }
}, {
  tableName: 'resource_articles',
  timestamps: false
});

module.exports = Article;