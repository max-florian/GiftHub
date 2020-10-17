const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async err => {
    const db = client.db("gifthub");

    const items = await db.collection("users").find({}).toArray();
    console.log("Log items:",items)

    client.close();
});
