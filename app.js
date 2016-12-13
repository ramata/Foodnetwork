var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

mongoose.Promise = require('bluebird');


//Routes
var index = require('./routes/home');
var users = require('./routes/users');
var comments = require('./routes/comments');

var app = express();


// Connect to database
mongoose.connect('mongodb://localhost/recipes');

 // view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public'));

app.use(session({ secret: 'WDI Rocks!',
                  resave: true,
                  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./config/passport/passport')(passport);


// This middleware will allow us to use the currentUser in our views and routes.
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/comments', comments);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(cookieParser());


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
    res.render('home/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('home/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
