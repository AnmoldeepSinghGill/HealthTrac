var accounts = require('../../app/controllers/account.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.post('/',accounts.create);
}