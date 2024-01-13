const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/'

// post /courses/:id/reviews (create)
router.post('/courses/:id/reviews', ensureLoggedIn, reviewCtrl.create);

module.exports = router;