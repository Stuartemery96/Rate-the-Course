const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  userName: String,
  userAvatar: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);