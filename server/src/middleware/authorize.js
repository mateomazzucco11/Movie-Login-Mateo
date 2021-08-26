const jwt = require('jsonwebtoken');
const dataBase = require('../helpers/db/connect');

const authorize = () => {
  return [
    jwt({})
  ]
}

module.exports = authorize;