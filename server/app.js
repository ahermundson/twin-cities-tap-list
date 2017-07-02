require('dotenv').config();
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoConnection = require('./modules/mongo-connection');

var index = require('./routes/index');
var bars = require('./routes/bars');
var beers = require('./routes/beers');
var breweries = require('./routes/breweries');
var bar = require('./routes/singleBar');
var users = require('./routes/users');
var app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


mongoose.Promise = global.Promise;
mongoConnection.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/bars', bars);
app.use('/beers', beers);
app.use('/breweries', breweries);
app.use('/bar', bar);
app.use('/users', users);
app.get('/test', function(req, res) {
  console.log(req.headers);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
