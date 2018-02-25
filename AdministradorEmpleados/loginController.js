var electron = require('electron');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/Public/js/Controllers'));

app.use(bodyParser.urlencoded({extended: true}));


app.post('/login', function (req, res) {
    console.log(req.body);
    res.send('Recibido')
})


