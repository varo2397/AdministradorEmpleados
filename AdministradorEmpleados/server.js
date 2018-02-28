//Javascript file that handles the requests coming from the webpages
//to run:
//  1)cd fileThatItsIn
//  2)node nameOfFile.js


let express = require('express'); //module for routing
let app = express();
let parser = require('body-parser'); //module to parse ajax requests
let session = require('express-session'); //module for saving user info
const bcrypt = require('bcrypt'); //module for encrypting passwords
let db = require('./connection'); //module for db connection

let salt = bcrypt.genSaltSync(10);

app.use(parser.urlencoded({extended : false}));
app.use(session({secret: 'ssshhhhh'}));
app.use(parser.json());
const port = 3000;

let sess; //letiable for sessions

app.post('/login', function (req, res) {

    let username = req.body.username; //username input
    let password = req.body.password; //password input
    sess = req.session; //requesting the current session

    db.login(username).then(function (response) {

        if(response.length > 0 && response[0].username == username && bcrypt.compareSync(password, response[0].password.toString())){

            sess.username = username;
            sess.typeOfUser = response[0].administrator;
            sess.userId = response[0].id;
            res.send('');
        }
        else {
            let errorMessage = 'Nombre de usuario o contraseña incorrecta';
            res.send(errorMessage);
        }

    }).catch(function (err) {
       console.log(err);
    })
});

app.get('/jobs',function (req, res) {
    //get all of the jobs available
    db.getJobs().then(function (response) {
        sess = req.session;
        sess.jobs = response;
        let html = '';
        for(let i = 0; i < response.length; i++){
            let status;
            if(response[i].state == 0){
                status = 'Inactivo';
            }
            else {
                status = 'Activo';
            }
            let element = '<tr>' +
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
    //save the selected job id in the session
    let selectedIdJob = req.body.selectedIdJob;

    sess = req.session;
    sess.selectedIdJob = selectedIdJob;

    let typeOfUser = sess.typeOfUser;

    if(typeOfUser == 0){ //checking if user has the permissions
        res.send('No tiene los permisos para modificar <br><br>');
    }
    else{
        res.send('');
    }
})

app.get('/checkPermisions', function(req, res){
    //get the info of selected job
    sess = req.session;
    let typeOfUser = sess.typeOfUser;

    if(typeOfUser == 0){ //checking if user has the permissions
        res.send('No tiene los permisos para modificar <br><br>');
    }
    else{
        res.send('');
    }
})

app.post('/editJob',function (req, res) {
    //edit a job
    sess = req.session;

    let jobName = req.body.jobName;
    let state = req.body.state === 'true' ? 1 : 0;
    let idJob = sess.selectedIdJob;

    db.editJob(idJob, jobName, state).then(function (response) {
        res.send('');
    })
})

app.post('/addJob', function (req, res) {
    //adding a job
    sess = req.session;
    let jobName = req.body.jobName;
    let state = req.body.state === 'true' ? 1 : 0; //passing from a string to db type

    db.addJob(jobName,state).then(function (response) {
        res.send('');
    })
})

app.get('/getPaymentHistory', function (req, res) {

    sess = req.session;
    let userId = sess.userId; //current user

    db.getPaymentHistory(userId).then(function (response) {
        let html = '';
        response.forEach(function (value) {
            let myDate = new Date(value.date);
            let date = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear(); //correct format of date
            let element = '<tr>' +
                '<td>' + date + '</td>' +
                '<td> ' + value.amount + '</td>'
                '</tr>';
            html += element;
        })
        res.send(html);
    })
})

app.get('/getPersonalInfo',function (req, res) {
    sess = req.session;
    let userId = sess.userId; //current logged in user

    db.getPersonalInformation(userId).then(function (response) {
        let html = '';
        let userData = response[0];

        //type of user
        let isAdministrator = (userData.administrator == 1 ? 'Si' : 'No' );

        //format date strings
        let date = new Date(userData.birthDate);
        let birthDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

        date = new Date(userData.startAtCompany);
        let startAtCompany = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

        html += '<li>Nombre: '+ userData.firstName + ' ' + userData.secondName + ' ' + userData.firstLastName + ' ' + userData.secondLastName + '</li>\n' +
            '<br>\n' +
            '<li>Cédula: '+ userData.identification + '</li>\n' +
            '<br>\n' +
            '<li>Celular: '+ userData.cellphone + '</li>\n' +
            '<br>\n' +
            '<li>Fecha de nacimiento: '+ birthDate + '</li>\n' +
            '<br>\n' +
            '<li>Correo: '+ userData.email + '</li>\n' +
            '<br>\n' +
            '<li>Número de cuenta bancaria: '+ userData.accountNumber +'</li>\n' +
            '<br>\n' +
            '<li>Puesto: ' + userData.jobName +'</li>\n' +
            '<br>\n' +
            '<li>Administrador: ' + isAdministrator + '</li>\n' +
            '<br>\n' +
            '<li>Dirección: ' + userData.address + '</li>' +
            '<br>\n' +
            '<li>Inicio de labores: ' + startAtCompany + '</li>\n';
        res.send(html);
    })
})

app.get('/vacations', function (req, res) {
    sess = req.session;
    let userId = sess.userId;

    db.getVacationHistory(userId).then(function (response) {
        let html = '';
        console.log(response);
        response.forEach(function (value) {

            let date = new Date(value.date);
            let vacationDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            let state = (value.state == 1 ? 'Aprobada' : 'Negada');
            let label = (value.state == 1 ? 'info' : 'danger');
            let numberDays = value.numberDays;

            html += '<tr>\n' +
                '<td>' + vacationDate + '</td>\n' +
                '<td>' + numberDays +'</td>' +
                '<td><span class="label label-' + label +' label-mini">' + state + '</span></td>\n' +
                '</tr>';
        })
        res.send(html);
    })
})

app.listen(port);




