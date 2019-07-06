const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Bring in User Model
let User = require('../models/user');

// Add Route
router.get('/search', function(req, res){
  res.render('search', {
  });
});

module.exports = router;