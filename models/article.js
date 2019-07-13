let mongoose = require('mongoose');

const date = new Date();  // dateStr you get from mongodb

const d = date.getDate();
const m = date.getMonth()+1;
const y = date.getFullYear();
const shortDate = m + "/" + d + "/" + y;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = monthNames[m-1] + " " + d + ", " + y;
const isoDate = new Date(longDate);
const millisecondDate = Date.parse(longDate);

// Article Schema
let articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  publisher:{
    type: String,
    required: true
  },
  editor1:{
    type: String,
    required: true
  },
  publisheddate:{
    type: Date,
    default: Date.now,
    required: true
  },
  date:{
    type: Date,
    default: Date.now,
    required: true
  },
  doctrine:{
    type: String,
    required: true
  },
  scripture:{
    type: String,
    required: false
  },
  series:{
    type: String,
    required: false
  },
  abstract:{
    type: String,
    required: false
  }
});

// Create text index for search bar.

articleSchema.index({
  title: 'text',
  abstract: 'text',
  author: 'text',
  scripture: 'text'
});

let Article = module.exports = mongoose.model('Article', articleSchema);
