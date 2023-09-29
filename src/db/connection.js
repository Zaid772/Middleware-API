const { Sequelize } = require("sequelize");
require("dotenv").config();
// dotenv for testing purposes only

const SQLconnection = new Sequelize(process.env.SQL_URI);

SQLconnection.authenticate();

console.log("Connection to DB is working");

module.exports = SQLconnection;