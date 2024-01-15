const Course = require('../models/course');

module.exports = {
  new: newReview,
  create,
  show,
}

async function newReview(req, res) {
  const course = await Course.findById(req.params.id);
  res.render('reviews/new', { title: 'ADD REVIEW', course });
}

async function create(req, res) {
  const course = await Course.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  course.reviews.push(req.body);
  try {
    await course.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/courses/${course._id}`);
}

async function show(req, res) {
  const course = await Course.findById(req.params.id);
  const reviewSubdoc = course.reviews.id(req.params.reviewId);
  res.render('reviews/show', { title: 'REVIEW DETAILS', review: reviewSubdoc, course });
}