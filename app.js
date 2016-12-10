var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');


var index = require('./routes/home');
var users = require('./routes/posts');

var app = express();


// Connect to database
mongoose.connect('mongodb://localhost/todos');

 // view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));

// Port setting
app.listen(3000, function() {
  console.log('server connected');
});
















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
