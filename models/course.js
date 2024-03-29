const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
  }
})

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  condition: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema],
  userName: String,
  userAvatar: String,
}, {
  timestamps: true
});

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
    default: 'https://i.imgur.com/SeLb3aO.png',
  },
  reviews: [reviewSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);