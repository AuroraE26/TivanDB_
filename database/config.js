const mysql = require ("mysql");

//Crear la conexion
const connection = mysql.createConnection({
    host: process.env.TIVAN_RDS_HOST,
    user: process.env.TIVAN_RDS_USER,
    password: process.env.TIVAN_RDS_PASSWORD,
    database: process.env.TIVAN_RDS_DB
});

//Conectar
connection.connect(error =>{
    if(error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
