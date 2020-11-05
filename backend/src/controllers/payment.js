const response = require("./response");
const mongo = require('../db');
const ObjectId = require('mongodb').ObjectId;

function payment(req, res) {
  const {id} = req.params;
  const total = req.body.total
  const tarjeta = req.body.tarjetaNueva
  let encpritNotarjeta = "xxxx-xxxx-xxxx-";

  /** Se agrega la nueva tarjeta si es necesario**/
  if(req.body.isNewCard){
    encpritNotarjeta += tarjeta.notarjeta.slice(-4)
    mongo().connect(async (error, client) => {
      if (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
      }
      await client.db().collection("users")
        .updateOne({ _id: new ObjectId(id) }, {
          $push: {  "payment": {
            "notarjeta": encpritNotarjeta,
            "mes": tarjeta.mesvenc,
            "anio": tarjeta.aniovenc
          }}
        })
      client.close()
    })
  } else {
    encpritNotarjeta = req.body.tarjetaRegistrada
    // console.log(encpritNotarjeta)
  }

  /** Se valida el pago con el banco**/
  /*const result = http.request({
      host: 'localhost',
      port: 4000,
      path: '/api/banco',
      method: 'POST'
    },function (res){
    console.log("validacion")
    if(res.statusCode !== 200) {
      return response(res, 501, false, 'Pago no validado, tarjeta incorrecta', { });
    }
  })
  result.end()*/

  mongo().connect(async (error, client) => {
    if (error) {
      return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }
    /** Una vez que se valida el pago se agregan las tarjetas al inventario **/
    let collection = client.db().collection("cards")
    // Ingresa uno por uno los elementos al inventario
    let carrito = req.body.carrito
    for(i=0; i< carrito.length; i++){
      carrito[i].user_id = id
      await collection.insertOne(carrito[i]).then((response) => {
        delete carrito[i].card_image
        delete carrito[i].user_id
      })
    }

    /** Se agregan los nombre a la transaccion para evitar join**/
    const user = await client.db().collection("users")
      .findOne({ _id: new ObjectId(id) });


    /** Se registra la transaccion de venta **/
    collection = client.db().collection("transaccion")
    await collection.insertOne({
      fecha: new Date(),
      tipo: "Compra",
      origen: "Tienda",
      origenname: 'Tienda',
      destino: id,
      destinoname: user.username,
      total: total,
      tarjeta: encpritNotarjeta,
      detalle: carrito
    })
    client.close();
    response(res, 200, true, 'Se ha realizado la compra exitosamente!',{ });
  });
}

function getPaymentMethods(req, res) {
  const {id} = req.params;

  mongo().connect(async (error, client) => {
    if (error) {
      return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }

    const user = await client.db().collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (user == null) return response(res, 404, false, 'No existe un usuario con id ' + id);

    client.close();
    delete user.password;
    response(res, 200, true, 'Usuario con id: ' + id, user.payment);
  });
}

module.exports = {
  payment,
  getPaymentMethods
}
