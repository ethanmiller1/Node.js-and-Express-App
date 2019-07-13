let mongoose = require('mongoose');

// Article Schema
let sermonSchema = mongoose.Schema({
  videolink:{
    type: String,
    required: false
  },
  audiolink:{
    type: String,
    required: false
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
  author:{
    type: String,
    required: true
  },
  doctrine:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  subtitle:{
    type: String,
    required: false
  },
  abstract:{
    type: String,
    required: false
  },
  transcript:{
    type: String,
    required: false
  },
  scripture:{
    type: [String],
    required: false
  },
  topics:{
    type: [String],
    required: false
  },
  publisher:{
    type: String,
    required: true
  },
  series:{
    type: String,
    required: false
  }
});

// Create text index for search bar.

sermonSchema.index({
  title: 'text',
  subtitle: 'text',
  abstract: 'text',
  author: 'text',
  scripture: 'text'
});

let Sermon = module.exports = mongoose.model('Sermon', sermonSchema);
