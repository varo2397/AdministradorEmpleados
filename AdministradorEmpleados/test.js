var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'companysystem',
    multipleStatements: true
});
var query = 'call addJob(?,?,@var); select @var';
connection.query(query,['Project Manager',0],function (err,rows) {
    if(err){
        console.log(err);
    }
    else {
        rows[1][0]["@var"];
    }
})