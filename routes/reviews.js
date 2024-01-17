const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes start with '/'

// get /reviews/new (new)
router.get('/courses/:id/reviews/new', ensureLoggedIn, reviewCtrl.new);
// post /courses/:id (create)
router.post('/courses/:id', ensureLoggedIn, reviewCtrl.create);
// get /courses/:id/reviews/:reviewId (show)
router.get('/courses/:id/reviews/:reviewId', ensureLoggedIn, reviewCtrl.show);
// get /courses/:id/reviews/:reviewId/edit  (edit)
router.get('/courses/:id/reviews/:reviewId/edit', ensureLoggedIn, reviewCtrl.edit);
// put /reviews/:reviewId (update)
router.put('/reviews/:reviewId', ensureLoggedIn, reviewCtrl.update);
// delete /reviews/:reviewId (delete)
router.delete('/reviews/:reviewId', ensureLoggedIn, reviewCtrl.delete);

module.exports = router;