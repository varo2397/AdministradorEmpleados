//Javascript file that handles the requests coming from the webpages
//to run:
//  1)cd fileThatItsIn
//  2)node nameOfFile.js


var express = require('express');
var app = express();
var parser = require('body-parser');
const bcrypt = require('bcrypt');
var db = require('./connection');

app.use(parser.urlencoded({extended : false}));
app.use(parser.json());
const port = 3000;

app.post('/login', function (req, res) {
    var username = req.body.username;
    db.login(username).then(function (response) {
        if(response.length > 0 && response[0].username == username){
            res.send('');
        }
        else {
            var errorMessage = 'Nombre de usuario o contraseña incorrecta';
            res.send(errorMessage);
        }

    }).catch(function (err) {
       console.log(err);
    })


});



app.listen(port);




