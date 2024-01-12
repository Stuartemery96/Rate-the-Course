const mongoose = ('mongoose');
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
    required: true
  },
  courseType: {
    type: String,
    required: true,
  },
  image: String,
});