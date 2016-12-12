var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/welcome');
});
router.get('/about', function(req, res) {
  res.render('home/about');
});
router.get('/recipes', function(req, res) {
  res.render('home/recipes');
});
router.get('/reviews', function(req, res) {
  res.render('home/reviews');
});
router.get('/login', function(req, res) {
  res.render('home/login');
});
router.get('/sign-up', function(req, res) {
  res.render('home/sign-up');
});


// GET /signup
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up.ejs', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/home',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
res.render('login.ejs', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
