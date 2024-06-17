//выгружаем данные с файла env (работает про помощи модуля который мы установили ранее (npm install dotenv))
require("dotenv").config();
//экспортируем модуль Express в файл
const express = require("express");
//экспортируем объект из файла db
const sequelize = require("./db");

const models = require("./models/models");

//при помощи cors сможем отправлять запрос браузеру (npm install cors)
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routers/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

// Порт нашего приложения (выгружаем PORT env или по умолчанию 5000)
const PORT = process.env.PORT || 5000;

//вызывая функцию express происходить запуск нашего приложения
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
//app.use(errorHandler) - обработка ошибок, обязательно должен быть в самом конце!
app.use(errorHandler);

//функция для подключения к бд (делаем ее асинхронной (все операции с базы данных должны быть асинхронные) )
const start = async () => {
  try {
    //с помощью authenticate будет подключения к бд (функция асинхронные не забываем про await)
    await sequelize.authenticate();

    //sync сверяет состояния БД (функция асинхронные не забываем про await)
    await sequelize.sync();
    //Вызываем функцию Listen где указываем PORT(где будет происходить запуск), а второй параметр указываем callback функцию которая запускает если сервер запускается успешно
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    //catch(e) для вылавливания ошибок
    console.log(e);
  }
};

start();
