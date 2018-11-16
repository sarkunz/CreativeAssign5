//all routes go here
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Meme = mongoose.model('Meme');

router.get('/memes', function(req, res, next) { //get is a read
  Meme.find(function(err, meme) {
    if (err) { return next(err); }
    res.json(meme);
  });
});

router.post('/memes', function(req, res, next) { //post is a create
  var meme = new Meme(req.body);
  meme.save(function(err, meme) {
    if (err) { return next(err); }
    res.json(meme);
  });
});

router.param('meme', function(req, res, next, id) {
  Meme.findById(id, function(err, meme) {
    if (err) { return next(err); }
    if (!meme) { return next(new Error("can't find meme")); }
    req.meme = meme;
    return next();
  });
});

router.get('/memes/:meme', function(req, res) {
  res.json(req.meme);
});

router.put('/memes/:meme/upvote', function(req, res, next) { //put is an update
  req.meme.upvote(function(err, meme) {
    if (err) { return next(err); }
    res.json(meme);
  });
});

router.put('/memes/:meme/downvote', function(req, res, next) { //put is an update
  req.meme.downvote(function(err, meme) {
    if (err) { return next(err); }
    res.json(meme);
  });
});

router.delete('/memes/:meme', function(req, res) {
  console.log("in Delete");
  req.meme.remove();
  res.sendStatus(200);
});


module.exports = router;
