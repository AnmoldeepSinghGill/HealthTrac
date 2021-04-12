var accounts = require('../../app/controllers/account.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.post('/',accounts.create);

    app.post('/signin', accounts.authenticate);
    app.get('/read_cookie', accounts.isSignedIn);

    //path to a protected page
    app.get('/welcome',accounts.welcome);
}