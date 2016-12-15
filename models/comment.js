let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let CommentSchema = new mongoose.Schema({
  text:    {type: String, required: true },
  user:    {type: ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

CommentSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

CommentSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

module.exports = mongoose.model('Comment', CommentSchema);
