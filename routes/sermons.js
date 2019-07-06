const express = require('express');
const router = express.Router();

// Bring in Sermon Model
let Sermon = require('../models/sermon');

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_sermon', {
    title:'Add Sermon'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_sermon', {
      title:'Add Sermon',
      errors:errors
    });
  } else {
    let sermon = new Sermon();

    /*
    const video_id = req.body.videolink.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    */
    function youtube_parser(url){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    /* These are the types of URLs supported
    http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
    http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
    http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
    http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
    http://www.youtube.com/embed/0zM3nApSvMg?rel=0
    http://www.youtube.com/watch?v=0zM3nApSvMg
    http://youtu.be/0zM3nApSvMg
    */
    const url = "https://www.youtube.com/";
    const embed = "embed/";
    const videoId = youtube_parser(req.body.videolink);
    const related = "?rel=0";
    const info = "&showinfo=0";
    const color = "&color=white";
    const videoUrl = url + embed + videoId + related + info + color;

    console.log(videoUrl);
    console.log(youtube_parser(req.body.videolink));

    sermon.videolink = videoId;
    sermon.audiolink = req.body.audiolink;
    sermon.title = req.body.title;
    sermon.publisher = req.user._id;
    sermon.author = req.body.author;
    sermon.doctrine = req.body.doctrine;
    sermon.scripture = req.body.scripture.split(',').map(item => item.trim());
    sermon.topics = req.body.topics.split(',').map(item => item.trim());
    sermon.series = req.body.series;
    sermon.abstract = req.body.abstract;

    sermon.save(function(err){
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
  Sermon.findById(req.params.id, function(err, sermon){
    User.findById(sermon.publisher, function(err, user){
      res.render('sermon', {
        sermon:sermon,
        publisher: user.firstname + " " + user.lastname
      });
    });
  });
});

// Get Sermons Page
router.get('/', function(req, res){
  Sermon.find({}, function(err, sermons){
    if(err){
      console.log(err);
    } else {
      res.render('sermons', {
        title:'Sermons',
        sermons:sermons
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
