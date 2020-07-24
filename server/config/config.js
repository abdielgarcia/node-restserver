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
    //Creamos una variable de entorno MONGO_URI donde guardamos esta url
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;