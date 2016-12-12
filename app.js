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
var users = require('./routes/posts');
var comments = require('./routes/comments');

var app = express();


// Connect to database
mongoose.connect('mongodb://localhost/todos');

 // view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', comments);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// This middleware will allow us to use the currentUser in our views and routes.
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/comments', comments);
// let passportConfigFunction = require('./config/passport/passport');
// passportConfigFunction(passport);















// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(cookieParser());


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// // app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};
// //
// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });
//
module.exports = app;
