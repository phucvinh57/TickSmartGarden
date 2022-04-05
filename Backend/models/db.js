const util = require('util')

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phucvinh',
    database: 'smartgarden'
});

connection.query()

const query = util.promisify(connection.query).bind(connection)

module.exports = query