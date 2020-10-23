const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;

function connection() {
    return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connection;