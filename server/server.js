require('./config/config'); //en esta ruta esta configurado el puerto
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('get usuario')
});


/**
 * Asi puedo accesder a los parametro senviados en un post
 *  * */
app.post('/usuario', function(req, res) {

    let body = req.body;

    //Ejemplo de como controlar lo sposibles errores en las apis y devolver un c[odigo del standar con un mensaje
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es requerido"
        });
    } else {
        res.json({
            persona: body
        });
    }

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json(id)
});

app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});