/****************************************************************************************************
 * *********************************************PUERTO***********************************************
 * configurando el puerto para que cuandopase a produccion, se tome el puerto habilitado en el servidor
 * ***************************************************************************************************
 * / */

process.env.PORT = process.env.PORT || 3000;


/**
 * ENTRONO
 * 
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**
 * Base de datos
 * 
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://agarcia:ZDtenQOAIv1Lx7Rm@cluster0.xddi3.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;