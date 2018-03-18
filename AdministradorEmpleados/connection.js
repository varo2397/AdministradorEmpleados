
let mysql = require('mysql');
let connection = mysql.createConnection({    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'companysystem',
    multipleStatements: true
});

var exports = module.exports = {};
exports.login = function login(username) {
    return new Promise(function (resolve, reject) {
            let query = 'select username, password, administrator,id from Person where username = \'' + username + '\';';
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
        let query = 'select * from Job';
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
        let query = 'call editJob(?,?,?,@let); select @let';
        connection.query(query,[idJob,newJobName,newJobStatus],function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows[1][0]["@let"]);
        })
    })
}

exports.addJob = function (jobName, jobState) {
    return new Promise((function (resolve, reject) {
        let query = 'call addJob(?,?,@let); select @let';
        connection.query(query,[jobName,jobState],function (err, rows) {
            if (err){
                reject(err);
            }
            resolve(rows[1][0]["@let"]);
        })
    }))
}

exports.getPaymentHistory = function (idUser) {
    return new Promise(function (resolve, reject) {
        let query = 'select date,amount from Payment where idUser = ' + idUser + ';';
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
        let query = 'insert into Payment (idUser, date, amount) values (' + idUser + ', \'' + date + '\', ' + amount + ');';
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
        let query = 'select p.*, j.jobName from Person as p inner join Job as j on p.job where p.id = '+ idUser +';';
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
        let query = 'select date,state,numberDays from Vacation where idUser = ' + idUser ;
        connection.query(query, function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.addVacation = function (idUser, date, numberDays) {
    return new Promise(function (resolve, reject) {
        console.log(date);
        let query = 'insert into vacation (date, idUser, state, numberDays) values (\'' + date + '\', ' + idUser + ', 0, ' + numberDays + ');';
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
        let query = 'select p.firstName, p.secondName, p.firstLastName, p.secondLastName ,v.* from vacation v inner join person p on v.idUser = p.id where state = 0 &&  v.date > current_timestamp;';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}


exports.approveVaction = function (idVaction,state) {
    return new Promise(function (resolve, reject) {
        let query = 'update vacation set state = ' + state +' where idVacation = ' + idVaction + ';';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.getJobsForUser = function () {
    return new Promise(function (resolve, reject) {
        let query = 'select * from Job where state = 1';
        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.addUser = function (accountNumber, firstName, secondName, firstLastName, secondLastName, address, cellphone,
                            housephone, email, job, birthDate, startAtCompany, username, password, identification,administrator) {
    return new Promise(function (resolve, reject) {
        let query = 'call addUser(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@var);select @var;';
        connection.query(query,
            [accountNumber, firstName, secondName, firstLastName, secondLastName, address,
            cellphone, housephone, email, job, birthDate, startAtCompany, username, password, identification,administrator],
            function (err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows[1][0]["@var"]);
        })
    })
}

exports.searchUserByUserName = function (username,idCurrentUser) {
    return new Promise( function (resolve,reject) {
        let query = 'SELECT p.* FROM person p INNER JOIN job j on j.idJob = p.job WHERE p.userName LIKE \'%'+ username+ '%\' and p.id != ' + 1 + ';';

        connection.query(query,function (err, rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

exports.searchUserByEmail = function (email, idCurrentUser) {
    return new Promise(function (resolve, reject) {
        let query = 'SELECT p.* FROM person p INNER JOIN job j on j.idJob = p.job WHERE p.email LIKE \'%'+ email+ '%\' and p.id != ' + 1 + ';';
        connection.query(query,function (err,rows) {
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}

