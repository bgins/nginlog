'use strict';

var express = require('express');
var parser = require('body-parser');
var path = require('path');

var server = express();
server.use(parser.urlencoded({ 'extended': false }));
server.use(parser.json());
server.use('/', express.static(__dirname + '/app'));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

server.listen(8080);
