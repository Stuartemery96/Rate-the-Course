const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/'

// get /reviews/new (new)
router.get('/courses/:id/reviews/new', ensureLoggedIn, reviewCtrl.new);
// post /courses/:id/reviews (create)
router.post('/courses/:id', ensureLoggedIn, reviewCtrl.create);
// get /reviews/:id (show)
router.get('/courses/:id/reviews/:reviewId', ensureLoggedIn, reviewCtrl.show);

module.exports = router;