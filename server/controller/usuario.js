const express = require('express');

//paquete de encriptacion de una sola via
const bcrypt = require('bcrypt');

const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();



/**
 * Metodo para listar usuario de forma paginada, le indico un desde y un limite
 * 
 */
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    console.log(desde);
    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //Cuento la cantidad de usuarios de base de datos
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });
            });

        });
});


/**
 * Asi puedo accesder a los parametro senviados en un post
 *  * */
app.post('/usuario', function(req, res) {

    let body = req.body;

    //Creo un objeto del modelo Usuario y le asigno los valores enviados desde el cliente
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //utilizo un paquete para encriptar
        role: body.role,
        estado: body.estado,
        google: body.google
    });


    //Asi se envia  aguardar a base de datos el modelo completo
    usuario.save((err, usuarioBD) => {

        //Si hay un error en la insercion, devuelvo un bat request con el error 400
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        //aqui personalizo lo que deseo devolover despues de la inservion
        let usuarioCreado = {
            nombre: usuarioBD.nombre,
            email: usuarioBD.email,
            role: usuarioBD.role,
            estado: usuarioBD.estado,
            google: usuarioBD.google
        }

        res.json({
            ok: true,
            usuario: usuarioCreado
        });

    });


});



app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    console.log(id);

    //Aqui filtro todas las propiedades que no quiero editar y que el cliente me puede enviar en el request
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    console.log(body);


    /**
     * id: id a editar
     * body: contiene el json que obtenemos desde el cliente
     * { new: true } le indicamos que vamos a obtener el objeto aqctualizado
     * err: obtenemos el error si ocurre
     * usuarioBD: objeto actualizado
     * runValidators: Le indicamos que realice las validaciones especificadas en el Schema
     */
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        //Si hay un error en la actualizacion, devuelvo un bat request con el error 400
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBD
        });

    });


});

/**
 * Metodo que elimina usuario por id
 * 
 */
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    console.log(id);

    let cambiaEstadoBorrado = {
        estado: false
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstadoBorrado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };


        //Si el usuario no existe en base de datos, enviamos la respuesta
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });


});

module.exports = app;