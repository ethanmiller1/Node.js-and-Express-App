const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

// Bring in Article Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('firstname', 'Valid first name is required').notEmpty();
  req.checkBody('lastname', 'Valid last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      firstname:firstname,
      lastname:lastname,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Proccess
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    successFlash: 'You are now logged in',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
  
});

// Load Edit Page
router.get('/edit/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.render('edit_user', {
      title:'Edit User Information',
      user:user
    });
  });
});

// Submit Edit Page Updates
router.post('/edit/:id', function(req, res){

  let user = {};
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.username = req.body.username;
  user.church = req.body.church;
  user.role = req.body.role;
  user.churchcity = req.body.churchcity;

  let query = {_id:req.params.id}

  User.update(query, user, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'User Account Updated');
      res.redirect('back')
    }
  });
});

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/users'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

// Uploads file to Local Disk and link to userID avatar field
router.post('/edit/:id/upload', upload.single('avatar'), (req, res) => {
  // Create empty array to hold avatar filename.
  let user = {};
  user.avatar = req.file.filename;

  // Create the query for MongoDB's update() function.
  let query = {_id:req.params.id}

  User.update(query, user, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Profile Picture Updated');
      res.redirect('back')
    }
  });
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Your are logged out');
  res.redirect('/users/login');
});

module.exports = router;
