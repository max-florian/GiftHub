const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes');

app.set('port', process.env.PORT || 4000);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ hola: 'mundo' });
})

app.use('/api', routes)

app.listen(app.get('port'), () => {
    console.log("Escuchando en el puerto: " + app.get('port'));
})