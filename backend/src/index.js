const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
    res.json({ hola: 'mundo' });
})

app.listen(app.get('port'), () => {
    console.log("Escuchando en el puerto: " + app.get('port'));
})