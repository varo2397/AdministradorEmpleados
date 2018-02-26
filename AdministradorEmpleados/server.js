//Javascript file that handles the requests coming from the webpages
//to run:
//  1)cd fileThatItsIn
//  2)node nameOfFile.js


var express = require('express'); //module for routing
var app = express();
var parser = require('body-parser'); //module to parse ajax requests
var session = require('express-session'); //module for saving user info
const bcrypt = require('bcrypt'); //module for encrypting passwords
var db = require('./connection'); //module for db connection

var salt = bcrypt.genSaltSync(10);

app.use(parser.urlencoded({extended : false}));
app.use(session({secret: 'ssshhhhh'}));
app.use(parser.json());
const port = 3000;

var sess;

app.post('/login', function (req, res) {

    var username = req.body.username; //username input
    var password = req.body.password; //password input
    sess = req.session; //requesting the current session

    db.login(username).then(function (response) {

        if(response.length > 0 && response[0].username == username && bcrypt.compareSync(password, response[0].password.toString())){

            sess.username = username;
            sess.typeOfUser = response[0].administrator;

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

app.get('/jobs',function (req, res) {
    db.jobs().then(function (response) {
        sess = req.session;
        sess.jobs = response;
        var html = '';
        for(var i = 0; i < response.length; i++){
            var status;
            if(response[i].state == 0){
                status = 'Inactivo';
            }
            else {
                status = 'Activo';
            }
            var element = '<tr>' +
                '<td>' + response[i].jobName + '</td>' +
                '<td>' + status + '</td>' +
                '<td><button class="select btn btn-theme02 btn-xs" id="' + response[i].idJob + '"><i class="fa fa-pencil"></i></button></td>' +
                '</tr>';
            html += element;
        }
        res.send(html);

    })
})

app.post('/selectedJob', function (req, res) {
    var selectedIdJob = req.body.selectedIdJob;

    sess = req.session;
    sess.selectedIdJob = selectedIdJob;

    res.send('');
})

app.get('/selectedJob', function(req, res){
    sess = req.session;
    var jobs = sess.jobs;
    var selectedIdJob = sess.selectedIdJob;
    for(var i = 0; i < jobs.length; i++){
        if(jobs[i].idJob == selectedIdJob){
            res.send(jobs[i].jobName);
        }
    }
})



app.listen(port);




