/*var mysql = require('mysql');

function Connection(){
    this.connection = mysql.createConnection({
        host        : 'localhost',
        user        : 'root',
        password    : 'root',
        database    : 'companysystem'
    });

    this.connected = function () {
        this.connection.connect();
        return this.connection;
    }
}*/
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
            var query = 'select username, password from User where username = \'' + username + '\';';
            connection.query(query, function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })


}



/*exports.login = function (username) {
    loginV(username).then(function (response) {
        return response;
    })
}*/

/*


exports.test = function () {
    connection.connect(function (err) {
        if(err){
            throw err;
        }
        else{
            return 'connected';
        }
    })
}

exports.loginVerification = function (username) {
    var query = 'select username, password from User where username = \'' + username + '\';';
    connection.connect(function (err) {
        if(err){
            throw err;
        }
        else{
            connection.query(query, function (err, rows) {
                if(err){
                    throw err;
                }
                return rows;
            })
        }

    });

}
*/

