const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All paths start with "/"

// post /reviews/:id/comments
router.post('/reviews/:reviewId/comments', ensureLoggedIn, commentsCtrl.create);
// get /reviews/:reviewId/comments/:id/edit (edit)
router.get('/reviews/:reviewId/comments/:commentId/edit', ensureLoggedIn, commentsCtrl.edit);
// put /reviews/:reviewId/comments/:commentId (Update)
router.put('/reviews/:reviewId/comments/:commentId', ensureLoggedIn, commentsCtrl.update);
// delete /reviews/:reviewId/comments/:commentId (delete)
router.delete('/reviews/:reviewId/comments/:commentId', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;