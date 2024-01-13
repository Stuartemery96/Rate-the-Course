const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/courses');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//  All paths begin with /courses

// get /courses ensureLoggedIn (index)
router.get('/', ensureLoggedIn, courseCtrl.index);
// get /courses/all ensureLoggedIn (allCourses)
router.get('/all', ensureLoggedIn, courseCtrl.allCourses);
// get /courses/new ensureLoggedIn (new)
router.get('/new', ensureLoggedIn, courseCtrl.new);
// post /courses ensureLoggedIn (create)
router.post('/', ensureLoggedIn, courseCtrl.create);
// get /courses/:id ensureLoggedIn (show)
router.get('/:id', ensureLoggedIn, courseCtrl.show)

module.exports = router;