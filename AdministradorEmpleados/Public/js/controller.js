var electron = require('electron');
var express = require('express');
var router = express.Router();


function test()
{
    var username = document.getElementById('username').value;
    console.log(username);
    return router.redirect('payroll.html');
}