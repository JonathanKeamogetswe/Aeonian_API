var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atd'
})

connection.connect((err) => {
    if (!err) { console.log("Connection Established Successfully") }
    else { console.log("Connection failed" + JSON.stringify(err, undefined, 2)) }
})

module.exports = connection