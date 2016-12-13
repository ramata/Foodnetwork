var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var Comment = require('../models/comment');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  console.log('comments index');
  // get all the comments and render the index view

});

// router.get('home/recipes', function(req, res){
//   Comment.find({}, function(err, allRecipes) {
//     if (err) {
//       return next(err);
//     } else {
//       res.render('home/recipes', {recipes: allRecipes})
//     }
//   });
// });

// router.get('./form', authenticate, function(req, res, next) {
//   res.render('posts/form');
// });

// var comments = global.currentUser.comments;
// res.render('home/', { comments: comments, message: req.flash() });


// NEW
router.get('/new',  authenticate, function(req, res, next) {
  var comment = {
    title: '',
    completed: false
  };
  res.render('posts/new', { comment: comment, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  // Comment.findById(req.params.id)
  // .then(function(comment) {
  //   if (!comment) return next(makeError(res, 'Document not found', 404));
  //   res.render('home/show', { comment: comment });
  // }, function(err) {
  //   return next(err);
  // });
});

// var comment = currentUser.comments.id(req.params.id);
  // if (!comment) return next(makeError(res, 'Document not found', 404));
  // res.render('posts/show', { comment: comment, message: req.flash() } );

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var comment = new Comment({
    title:     req.body.title,
    completed: req.body.completed ? true : false
  });
  // Since a user's comments are an embedded document, we just need to push a new
  // Comment to the user's list of comments and save the user.
  currentUser.comments.push(comment);
  currentUser.save()
  .then(function() {
    res.redirect('/comments');
  }, function(err) {
    return next(err);
  });

});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var comment = currentUser.comments.id(req.params.id);
  if (!comment) return next(makeError(res, 'Document not found', 404));
  res.render('posts/edit', { comment: comment, message: req.flash() } );
});

// UPDATE
router.put('/:id',  authenticate, function(req, res, next) {
  var comment = currentUser.comments.id(req.params.id);
  if (!comment) return next(makeError(res, 'Document not found', 404));
  else {
    comment.title = req.body.title;
    comment.completed = req.body.completed ? true : false;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/comments');
    }, function(err) {
      return next(err);
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var comment = currentUser.comments.id(req.params.id);
  if (!comment) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.comments.indexOf(comment);
  currentUser.comments.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/comments');
  }, function(err) {
    return next(err);
  });
});

// TOGGLE completed
router.get('/:id/toggle', authenticate, function(req, res, next) {
  var comment = currentUser.comments.id(req.params.id);
  if (!comment) return next(makeError(res, 'Document not found', 404));
  else {
    comment.completed = !comment.completed;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/comments');
    }, function(err) {
      return next(err);
    });
  }
});

module.exports = router;
