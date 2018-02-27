
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
            var query = 'select username, password, administrator from Person where username = \'' + username + '\';';
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

