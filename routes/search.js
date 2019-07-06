const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Search Post Route
router.post('/search', function(req, res){
  let search = req.body.search;

  Article.find(
    {$or:[
      {title: {$regex : `.*${search}.*`}},
      {abstract: {$regex : `.*${search}.*`}},
      {author: {$regex : `.*${search}.*`}}
    ]}, function(err, articles) {
      if(err) {
         console.log(err);
      }
      else{
        res.render('search', {
        title:'Articles',
        articles: articles
      });
      }
  });
});

// Render search page.
router.get('/search', function(req, res){
  Article.find({}, function(err, articles) {
      if(err) {
         console.log(err);
      }
      else{
        res.render('search', {
        title:'Articles',
        articles: articles
      });
      }
  });
});

module.exports = router;