const Course = require('../models/course');

module.exports = {
  create,
  edit,
  update,
  delete: deleteComment
}

async function create(req, res) {
  const course = await Course.findOne({
    'reviews._id': req.params.reviewId,
    'reviews.user': req.user._id
  });
  const review = course.reviews.find(r => r._id == req.params.reviewId);
  req.body.user = req.user._id;
  req.body.userName = req.user.userName;
  req.body.userAvatar = req.user.avatar;
  review.comments.push(req.body);
  try {
    await course.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/courses/${course._id}/reviews/${review._id}`);
}

async function edit(req, res) {
  const course = await Course.findOne({
    'reviews.comments.user': req.user._id,
    'reviews.comments._id': req.params.commentId,
  });
  const review = course.reviews.id(req.params.reviewId);
  console.log(review);
  const comment = review.comments.id(req.params.commentId);
  res.render('comments/edit', { title: 'EDIT COMMENT', review, comment });
}

async function update(req, res) {
  const course = await Course.findOne({
    'reviews.comments.user': req.user._id,
    'reviews.comments._id': req.params.commentId
  });
  const review = course.reviews.id(req.params.reviewId);
  const commentSubdoc = review.comments.id(req.params.commentId);
  if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/courses/${course._id}/reviews/${review._id}`)
  commentSubdoc.content = req.body.content;
  try {
    await course.save();
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/courses/${course._id}/reviews/${review._id}`);
}

async function deleteComment(req, res) {
  const course = await Course.findOne({
    'reviews.comments.user': req.user._id,
    'reviews.comments._id': req.params.commentId
  });
  console.log(course);
  if (!course) return res.redirect(`/courses/${course._id}/reviews/${review._id}`);
  const review = course.reviews.id(req.params.reviewId);
  review.comments.remove(req.params.commentId);
  await course.save();
  res.redirect(`/courses/${course._id}/reviews/${review._id}`);
}