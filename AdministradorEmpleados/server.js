//Javascript file that handles the requests coming from the webpages
//to run:
//  1)cd fileThatItsIn
//  2)node nameOfFile.js


var express = require('express');
var app = express();

const port = 3000;

app.post('/login', function (req, res) {
    console.log('funciono esta mierda');
    res.send('hola');
})

app.listen(port);




