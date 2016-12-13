var LocalStrategy   = require('passport-local').Strategy;
var User           = require('../../models/user');

//simple configuration
var strategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        console.log('error: user already exists');
        // A user with this email already exists
        return callback(null, false, req.flash('error', 'This email is already taken.'));
      }
      else {
        console.log('creating a new user');
        // Create a new user
        var newUser            = new User();
        newUser.local.email    = req.body.email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err, savedUser) {
          console.log('new user saved:', savedUser);
          return callback(err, savedUser);
        });
      }
    });
  });

module.exports = strategy;
