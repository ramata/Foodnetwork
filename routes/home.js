var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/welcome', { message: req.flash() });
});
router.get('/about', function(req, res) {
  res.render('home/about', { message: req.flash() });
});
router.get('/recipes', function(req, res) {
  // TODO: get the recipes from an API call or from MongoDB
  let recipes = [
    { title: "Recipe 1", url: "https://goo.gl/tJhTmV" },
    { title: "Recipe 2", url: "https://goo.gl/XMmv38" },
    { title: "Recipe 3", url: "https://goo.gl/XMmv38" }
  ];
  res.render('home/recipes', { recipes: recipes, message: req.flash() });
});
router.get('/reviews', function(req, res) {
  res.render('home/reviews', { message: req.flash() });
});
router.get('/login', function(req, res) {
  res.render('home/login', { message: req.flash() });
});
router.get('/signup', function(req, res) {
  res.render('home/signup', { message: req.flash() });
});
router.get('/allstars-chefs', function(req, res) {
  res.render('home/allstars-chefs', { message: req.flash() });
});


// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
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
    successRedirect : '/',
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
