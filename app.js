const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//MongoDB connection settings
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/rest";
//Use monk to connect to db instance, 'cause it just works
var monk = require('monk');
var db = monk(url);

// Routes for the API
const index = require('./routes/index');
const users = require('./routes/users');
const media = require('./routes/media');

//Set a port to listen for incoming requests
const port = process.env.PORT || 8080;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Make db connection accessible to all routes
app.use((req,res,next) => {
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/media', media);

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

app.listen(port);
console.log('Listening to port ' + port);

module.exports = app;
