
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'companysystem'
});
var exports = module.exports = {};
exports.login = function loginV(username) {
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


exports.jobs = function jobsV () {
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

