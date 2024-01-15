const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All paths start with "/"

// post /courses/:id/reviews/:id/comments
router.post('/courses/:id/reviews/:reviewId/comments', ensureLoggedIn, commentsCtrl.create);

module.exports = router;