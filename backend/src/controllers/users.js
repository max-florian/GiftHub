const response = require("./response");
const mongo = require('../db');
const ObjectId = require('mongodb').ObjectId;

function getUserByFilter(filter) {
    return new Promise((resolve, reject) => {
        mongo().connect(async (error, client) => {
            if (error) return reject(error);

            const user = await client.db().collection("users")
                .findOne(filter);

            client.close();
            return resolve(user);
        });

    })
}

function updateUserById(id, user) {
    return new Promise((resolve, reject) => {
        mongo().connect(async (error, client) => {
            if (error) return reject(error);

            const { result } = await client.db().collection("users")
                .updateOne({ _id: new ObjectId(id) }, {
                    $set: {
                        ...user
                    }
                });

            client.close();

            return resolve(result.ok)
        });
    })
}

async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await getUserByFilter({ _id: new ObjectId(id) })
        if (user == null) return response(res, 404, false, 'No existe un usuario con id ' + id);

        delete user.password;
        return response(res, 200, true, 'Usuario con id: ' + id, { user });
    } catch (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const dbuser = await getUserByFilter({ $or: [{ username: user.username }, { email: user.email }] })
        if (dbuser != null) {
            if (!dbuser._id.equals(id)) return response(res, 400, false, 'Ya existe un usuario con el mismo username o email ');
        }

        delete user.password;
        delete user._id;

        if ((await updateUserById(id, user)) == 0) {
            return response(res, 501, false, 'No se pudo actualizar el usuario ' + id, {});
        }

        return response(res, 200, true, 'Usuario actualizado correctamente ' + id, { _id: id, ...user });
    } catch (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }

}

module.exports = {
    getUser,
    updateUser
}