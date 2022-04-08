require('dotenv').config()
const util = require('util')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
});

connection.connect(err => {
    if(err) {
        console.error(err)
        process.exit()
    }
    console.log("Database has been connected !")
})

const dbQuery = util.promisify(connection.query).bind(connection)

module.exports = dbQuery