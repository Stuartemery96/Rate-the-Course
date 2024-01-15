const Course = require('../models/course');

module.exports = {
  create,
}

async function create(req, res) {
  const course = await Course.findById(req.params.id);
  console.log(req.params.reviewId)
  let review = course.reviews.find(r => r._id == req.params.reviewId)
  console.log(review);
  req.body.user = req.user._id;
  req.body.userName = req.user.userName;
  req.body.userAvatar = req.user.avatar;
  review.comments.push(req.body);
  try {
    await course.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/courses/${course._id}`)
}