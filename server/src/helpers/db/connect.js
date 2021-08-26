const mysql = require('mysql');

require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const dataBase = mysql.createConnection({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
})

dataBase.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected with data base')
  }
});

module.exports = dataBase;