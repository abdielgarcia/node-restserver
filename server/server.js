const express = require('express');
require('./config/config'); //en esta ruta esta configurado el puerto

const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./controller/index.js'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {

    if (err) throw new Error('Conexion a base de datos fallida');
    console.log('Base de datos ONLINE');
});