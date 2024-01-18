const Course = require('../models/course');

module.exports = {
  index,
  allCourses,
  new: newCourse,
  create,
  show,
}

async function index(req, res) {
  const courses = await Course.find({ user: req.user._id });
  res.render('courses/index', { title: 'MY COURSES', courses });
}

async function allCourses(req, res) {
  const courses = await Course.find({});
  res.render('courses/all', { title: 'COURSES', courses });
}

function newCourse(req, res) {
  res.render('courses/new', { title: 'ADD A COURSE', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  try {
    await Course.create(req.body)
    res.redirect(`/courses`);
  } catch (err) {
    console.log(err);
    res.render('courses/new', { errorMsg: err.message });
  }
}

async function show(req, res) {
  const course = await Course.findById(req.params.id);
  let total1 = 0, total2 = 0, total3 = 0;
  course.reviews.forEach(function (r) {
    total1 += r.overallRating
  });
  course.reviews.forEach(function (r) {
    total2 += r.difficulty
  });
  course.reviews.forEach(function (r) {
    total3 += r.condition
  });
  let rating = (total1 / course.reviews.length).toFixed(1);
  let difficulty = (total2 / course.reviews.length).toFixed(1);
  let condition = (total3 / course.reviews.length).toFixed(1);
  res.render('courses/show', { title: 'Course Reviews', course, rating, difficulty, condition })
}


