const mongo = require('../db');
const response = require('./response');

function transactionLog(req, res) {

    mongo().connect(async (error, client) => {
        if (error) {
            return response(res, 501, false, 'Ha ocurrido un error en el servidor', { error });
        }

        const filter = {};
        if(req.params.user != 'admin'){
            filter.$or = [{origen: req.params.user},{destino: req.params.user}]
        }
        const query = await client.db().collection("transaccion").aggregate([
            {$match: filter},
            //{$addFields: { fecha: {$dateToString: {format: "%Y-%m-%d", date: 'fecha', timezone: 'America/Guatemala'}}}},
            {$sort: {fecha:-1}}
        ]);

        const docs = await query.toArray();

        client.close();


        response(res, 200, true, 'Query exitoso', { docs });
    });
}

module.exports = {
    transactionLog
}