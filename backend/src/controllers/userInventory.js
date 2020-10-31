const response = require("./response");
const mongo = require('../db');

function getUserInventoryByFilter(filter) {
    return new Promise((resolve, reject) => {
        mongo().connect(async (error, client) => {
            if (error) return reject(error);
            const user = await client.db().collection("cards")
            //.find({}).toArray();
            .find(filter).toArray();

            client.close();
            return resolve(user);
        });
    })
}

function transfer()


async function getUserCards(req, res) {
    const { id } = req.params;

    try {
        const cards = await getUserInventoryByFilter({ user_id: id })
        return response(res, 200, true, 'Cards del usuario con id con id: ' + id, { cards });
    } catch (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }
} 

async function transfer(req, res) {
    const { id } = req.params;

    try {
        const cards = await changeUser({ user_id: id })
        return response(res, 200, true, 'Cards del usuario con id con id: ' + id, { cards });
    } catch (error) {
        return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
    }
} 

module.exports ={
    getUserCards
}