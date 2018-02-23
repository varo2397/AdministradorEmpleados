var mysql = require('mysql');

function Connection(){
    this.connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : 'root',
        database    : 'sistemaempresa'
    });

    this.connected = function () {
        this.connection.connect();
        return this.connection;
    }
}