
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
