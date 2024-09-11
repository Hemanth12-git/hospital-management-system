const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hospital_db', 'postgres', 'Welcome@123#', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = {sequelize}