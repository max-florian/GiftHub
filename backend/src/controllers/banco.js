const response = require("./response");
const mongo = require('../db');
const ObjectId = require('mongodb').ObjectId;

function validateTransaccion(req, res){
  const tarjeta = req.body.notarjeta
  response(res, 200, true, 'Se ha realizado la transaccion exitosamente!' + tarjeta, true);
}

module.exports = {
  validateTransaccion
}
