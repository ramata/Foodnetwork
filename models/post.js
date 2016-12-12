let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');
let Comment = require('./comment')

let PostSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  },
  comments : [Comment.schema]
});

PostSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

PostSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


// model & export
let Post = mongoose.model('Post', PostSchema);
module.exports = Post;
