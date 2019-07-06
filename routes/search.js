const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Add Route
router.get('/search', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('search', {
        title:'Articles',
        articles: articles
      });
    }
  });
});

module.exports = router;