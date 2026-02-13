const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB || 'ecocampusdb',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASS || 'password',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;