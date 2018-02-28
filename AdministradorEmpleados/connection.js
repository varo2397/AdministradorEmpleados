
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'companysystem'
});



var exports = module.exports = {};
exports.login = function login(username) {
    return new Promise(function (resolve, reject) {
            var query = 'select username, password, administrator,id from Person where username = \'' + username + '\';';
            connection.query(query, function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
}


exports.getJobs = function jobs () {
    return new Promise(function (resolve, reject) {
        var query = 'select * from Job';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.editJob = function (idJob,newJobName,newJobStatus) {
    return new Promise(function (resolve, reject) {
        var query = 'update Job set jobName = \'' + newJobName + '\', state = ' + newJobStatus + ' where idJob = ' + idJob + ';';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve('');
        })
    })
}

exports.addJob = function (jobName, jobState) {
    return new Promise((function (resolve, reject) {
        var query = 'insert into Job(jobName,state) values(\'' + jobName + '\',' + jobState + ');'
        connection.query(query,function (err, rows) {
            if (err){
                reject(err);
            }
            resolve('');
        })
    }))
}

exports.getPaymentHistory = function (idUser) {
    return new Promise(function (resolve, reject) {
        var query = 'select date,amount from Payment where idUser = ' + idUser + ';';
        connection.query(query,function (err,rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.addPayment = function (idUser, date, amount) {
    return new Promise(function (resolve, reject) {
        var query = 'insert into Payment (idUser, date, amount) values (\'' + idUser + '\', ' + date + ', 0, ' + amount + ');';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.getPersonalInformation = function (idUser) {
    return new Promise(function (resolve, reject) {
        var query = 'select p.*, j.jobName from Person as p inner join Job as j on p.job where p.id = '+ idUser +';';
        connection.query(query,function (err,rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.getVacationHistory = function (idUser) {
    return new Promise(function (resolve, reject) {
        var query = 'select date,state,numberDays from Vacation where idUser = ' + idUser ;
        connection.query(query, function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.addVaction = function (idUser, date, numberDays) {
    return new Promise(function (resolve, reject) {
        var query = 'insert into vacation (date, idUser, state, numberDays) values (\'' + date + '\', ' + idUser + ', 0, ' + numberDays + ');';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.getUnapprovedVactions = function () {
    return new Promise(function (resolve, reject) {
        var query = 'select p.firstName, p.secondName, p.firstLastName, p.secondLastName ,v.* from vacation v inner join person p on v.idUser = p.id where state = 0;';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}


exports.approveVaction = function (idVaction) {
    return new Promise(function (resolve, reject) {
        var query = 'update vacation set state = 1 where idVacation = ' + idVaction + ';';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

// reemplazado con el stored procedure addUser
/*
exports.addUser = function (accountNumber, firstName, secondName, firstLastName, secondLastName, address, cellphone, housephone, email, job, birthDate, startAtCompany, username, password, identification) {
    return new Promise(function (resolve, reject) {
		
		// query para ver si ya existe un usuario con ese username, email, accountNumber, identification
		var query = 'select id from person where userName LIKE \'' + username + '\' OR email LIKE \'' + email + '\' OR accountNumber LIKE \'' + accountNumber + '\' OR identification LIKE \'' + identification + '\';'
        // query que devuelve una unica fila con el id del job
		var query = 'select idJob from job where jobName LIKE \'' + job + '\';';
		//var jobId = ...
		var query = 'insert into person (accountNumber, firstName, secondName, firstLastName, secondLastName, address, cellphone, housephone, email, job, birthDate, startAtCompany, userName, password, administrator, identification) values (' + accountNumber + ', \'' + firstName + '\', \'' + secondName + '\', \'' + firstLastName + '\', \'' + secondLastName + '\', \'' + address + '\', ' + cellphone + ', ' + housephone + ', \'' + email + '\', ' + jobId + ', \'' + birthDate + '\', \'' + startAtCompany + '\', \'' + username + '\', \'' + bcrypt.hashSync(password,10) '\', 0, ' + identification + ');';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}
*/
