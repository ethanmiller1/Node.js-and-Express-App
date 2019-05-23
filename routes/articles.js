const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
//  req.checkBody('author', 'Author is required').notEmpty();
//  req.checkBody('editor1', 'Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.publisher = req.user._id;
    article.author = req.user.firstname + " " + req.user.lastname;
    article.editor1 = req.body.editor1;
    article.doctrine = req.body.doctrine;
    article.scripture = req.body.scripture;
    article.series = req.body.series;
    article.abstract = req.body.abstract;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Article Added');
        res.redirect('/')
      }
    });
  }

});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.publisher != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    } else {
      res.render('edit_article', {
        title:'Edit Article',
        article:article
      });
    }
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){

  let article = {};
  article.title = req.body.title;
  article.publisher = req.user._id;
  article.author = req.user.firstname + " " + req.user.lastname;
  article.editor1 = req.body.editor1;
  article.doctrine = req.body.doctrine;
  article.scripture = req.body.scripture;
  article.series = req.body.series;
  article.abstract = req.body.abstract;
  const datePickerInput = req.body.date;
  const datePickerOutput = new Date(datePickerInput);
  article.date = datePickerOutput;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/')
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.publisher != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success')
      });
    }
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.publisher, function(err, user){
      res.render('article', {
        article:article,
        publisher: user.firstname + " " + user.lastname
      });
    });
  });
});

// Get Articles Page
router.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('articles', {
        title:'Articles',
        articles: articles
      });
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
