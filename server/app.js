var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql = require('mysql');
var path = require('path');
var Q = require('q');


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '../client'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client')));
app.use(session({
  secret: 'changeitlater',
  saveUninitialized: true,
  resave: true
})); // session secret
require('./config')(app, mysql);
require('./db')(app);
require('./utils')(app, Q);
require('./controllers')(app, Q);
require('./routes')(app);


/**
 * To Allow Cross-Origin-Access
 **/
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");//http://localhost:4000
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile('error.html');
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html');
});


module.exports = app;
