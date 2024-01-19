const Course = require('../models/course');

module.exports = {
  new: newReview,
  create,
  show,
  edit,
  update,
  delete: deleteReview
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

async function edit(req, res) {
  const course = await Course.findOne({
    'reviews._id': req.params.reviewId,
    'reviews.user': req.user._id
  });
  const review = course.reviews.id(req.params.reviewId)

  res.render('reviews/edit', { title: 'EDIT REVIEW', course, review });
}

async function update(req, res) {
  const course = await Course.findOne({ 'reviews._id': req.params.reviewId });
  const reviewSubdoc = course.reviews.id(req.params.reviewId);

  if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/courses/${course._id}`);
  reviewSubdoc.content = req.body.content;
  reviewSubdoc.overallRating = req.body.overallRating;
  reviewSubdoc.difficulty = req.body.difficulty;
  reviewSubdoc.condition = req.body.condition;
  reviewSubdoc.image = req.body.image;
  try {
    await course.save();
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(`/courses/${course._id}`);
}

async function deleteReview(req, res) {
  const course = await Course.findOne({
    'reviews._id': req.params.reviewId,
    'reviews.user': req.user._id
  });
  if (!course) return res.redirect(`/courses/${course._id}`);
  course.reviews.remove(req.params.reviewId);
  await course.save();
  res.redirect(`/courses/${course._id}`);
}