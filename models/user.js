let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');
let Comment = require('./comment')

let UserSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  },
  comments : [Comment.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


// model & export
let User = mongoose.model('User', UserSchema);
module.exports = User;
