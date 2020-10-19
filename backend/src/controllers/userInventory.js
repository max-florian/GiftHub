const response = require("./response");
const mongo = require('../db');
const ObjectId = require('mongodb').ObjectId;

function getUserInventoryByFilter(filter) {
    return new Promise((resolve, reject) => {
        mongo().connect(async (error, client) => {
            if (error) return reject(error);

            const user = await client.db().collection("cards")
                .findOne(filter);

            client.close();
            return resolve(user);
        });

    })
}


async function getUserCards(req, res) {
    const { id } = req.params;

    try {
        const user = await getUserInventoryByFilter({ user_id: new ObjectId(id) })
        if (user == null) return response(res, 404, false, 'No existe un usuario con id ' + id);
        delete user.password;
        return response(res, 200, true, 'Usuario con id: ' + id, { user });
    } catch (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }
} 
module.exports ={
    getUserCards
}