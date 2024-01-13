const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  holeCount: {
    type: Number,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    match: /[A-Z][a-z]+, [A-Z]{2}/,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    default: 'https://replit.com/@stuemery96/20-isPrime#challenge.js',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);