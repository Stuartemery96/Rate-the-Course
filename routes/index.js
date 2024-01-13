var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Rate the Course' });
});

router.get('/auth/google', passport.authenticate(
  // which passport strategy to use
  'google',
  {
    scope: ['profile', 'email'],
    // optional... forces pick account every time.
    prompt: 'select_account',
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/courses',
    // change in your app to whats best to your page. ("landing" page)
    failureRedirect: '/'
  }
));


router.get('/logout', function (req, res) {
  req.logOut(function () {
    // change in your app to whats best to your page. ("landing" page)
    res.redirect('/');
  });
});

module.exports = router;
