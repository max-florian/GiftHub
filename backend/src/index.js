const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./db');
const routes = require('./routes');

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ hola: 'mundo' });
})

app.use('/api', routes)

app.listen(app.get('port'), () => {
    console.log("Escuchando en el puerto: " + app.get('port'));
})