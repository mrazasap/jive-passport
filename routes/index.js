var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Index');
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
});

router.get('/profile', function (req, res) {
    res.send("Authenticated");
});

router.get('/auth/jive-npm',
  passport.authenticate('jive-npm'));

router.get('/auth/jive-npm/callback',
  passport.authenticate('jive-npm', { failureRedirect: '/' }),
  function(req, res) {
    res.send(req.body);
    // Successful authentication, redirect home.
    //res.redirect('/profile');
});

router.get('/auth/jive',
  passport.authenticate('jive'));

router.get('/auth/jive/callback',
  passport.authenticate('jive', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
});

module.exports = router;
