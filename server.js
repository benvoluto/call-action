var http = require('http');
var express = require('express');
var app = express();
require('./routes')(app);
var server = http.createServer(app);
module.exports = server;
