const express = require('express');
const router = express.Router();

// Bring in Sermon Model
let Sermon = require('../models/sermon');

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Search Post Route
router.post('/search', function(req, res){
  let search = req.body.search;

  Article.find(
    {$text: { $search : search }},
    function(err, articles) {
  Sermon.find(
    {$text: { $search : search }},
    function(err, sermons) {
      if(err) {
         console.log(err);
      }
      else{
        res.render('search', {
          title:'Search',
          articles: articles,
          sermons: sermons
        });
      }
  });
  });
});

// Render search page.
router.get('/search', function(req, res){
  Article.find({}, function(err, articles) {
    Sermon.find({}, function(err, sermons) {
      if(err) {
         console.log(err);
      }
      else{
        res.render('search', {
        title:'Search',
        articles: articles,
        sermons:sermons,
        resources: articles + sermons
        });
      }
    });
  });
});

module.exports = router;