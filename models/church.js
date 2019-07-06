const mongoose = require('mongoose');

// User Schema
const ChurchSchema = mongoose.Schema({
  churchname:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: false
  },
  country:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  zip:{
    type: String,
    required: false
  },
  pastor:{
    type: String,
    required: true
  },
});

const User = module.exports = mongoose.model('User', ChurchSchema);
