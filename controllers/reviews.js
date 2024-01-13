const Course = require('../models/course');

module.exports = {
  create,
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
}