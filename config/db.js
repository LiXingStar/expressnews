let mysql = require('mysql');
let  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'news',
    port : 3306
});

connection.connect();

module.exports = connection;