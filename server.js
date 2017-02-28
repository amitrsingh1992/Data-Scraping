var express = require('express');
var router = express.Router();
var fs = require('fs');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var use = require('./model/gpSchema');

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/categoryForPackage', require("./controller/categoryForPackage"));


app.listen('8081')
console.log('Magic happens on port 8081');
module.exports = app;
