const mysql = require('mysql'); // modulo mysql
const path = require('path'); // modulo path
const { promisify } = require('util'); //modulo util promisify

// configurar variables de entorno
require('dotenv').config({
    path: path.join(__dirname, '../.env')
});

// traer variables de entorno para mysql
const { DB_HOST, DB_USER, DB_PASS } = require('./index.config');

// variables de conexión para mysql
const database = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: 'ubimedDev'
};

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) throw err;
    if (connection) {
        console.log(`Conectado a base de datos Host ${database.host}`);
    }
});

pool.query = promisify(pool.query); // pasar de callbacks a promesas

module.exports = {
    pool,
    database
};