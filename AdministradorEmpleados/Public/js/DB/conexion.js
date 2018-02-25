/*var mysql = require('mysql');

function Connection(){
    this.connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : 'root',
        database    : 'companysystem'
    });

    this.connected = function () {
        this.connection.connect();
        return this.connection;
    }
}*/
const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'companysystem'
});
connection.connect((err) => {
    if (err) {
        console.log(err) ;
    }
    else {
        console.log('Connected!');
    }
});

app.listen(3306);