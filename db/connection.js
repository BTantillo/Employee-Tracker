const mysql = require("mysql2");

const matrix = mysql.createConnection({
    host: 'localhost',
    // mysql username
    user: 'root',
    // mysql password
    password: "mysqlrocks99!",
    database: 'Staff_db'
});

matrix.connect(function (err) {
    if (err) throw err;
})

module.exports = matrix;