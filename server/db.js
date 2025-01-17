//Здесь происходить подключения к базе данных

//экспортируем sequelize
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME, //названия БД
  process.env.DB_USER, //имя пользователя
  process.env.DB_PASSWORD, //пароль
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
