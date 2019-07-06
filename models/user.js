const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  username:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  church:{
    type: String,
    required: false
  },
  role:{
    type: String,
    required: false
  },
  churchcity:{
    type: String,
    required: false
  },
  avatar:{
    type: String,
    required: false
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
