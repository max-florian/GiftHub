const response = require('./response');
const mongo = require('../db');


function registro(req, res) {
    const { nombre, id, email, contrasena } = req.body;

    if (!nombre || !contrasena || !email || !id) {
        return response(res, 400, false, 'Llene todos los campos');
    }
    const nuevousuario = {
        username: id,
        password: contrasena,
        email: email,
        name: nombre,
        lastname: "",
        age: "",
        dpi: ""
    };
    mongo().connect(async (error, client) => {
        if (error) {
            return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
        }
        client.db().collection("users").insertOne(nuevousuario, function(err, res) {
            if (err) throw err;
            console.log("Usuario insertado!");
            client.close();
            //response(res, 200, true, 'Se ha registrado exitosamente!', { user:  nuevousuario.username});
        });
        
    });
}


module.exports = {
    registro
}