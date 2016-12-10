let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true
});


// model & export
let Post = mongoose.model("Post", PostSchema);
module.exports = Post;
