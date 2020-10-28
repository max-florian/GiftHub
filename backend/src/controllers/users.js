const response = require("./response");
const mongo = require('../db');
const ObjectId = require('mongodb').ObjectId;

function getUser(req, res) {
    const { id } = req.params;

    mongo().connect(async (error, client) => {
        if (error) {
            return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
        }

        const user = await client.db().collection("users")
            .findOne({ _id: new ObjectId(id) });

        if (user == null) return response(res, 404, false, 'No existe un usuario con id ' + id);

        client.close();
        delete user.password;
        response(res, 200, true, 'Usuario con id: ' + id, { user });
    });
}

module.exports = {
    getUser
}
