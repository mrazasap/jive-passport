var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');

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
    console.log("req", req);
    res.send("req.user " + req.user);
    // Successful authentication, redirect home.
    //res.redirect('/profile');
});

router.get('/auth/jive',
  passport.authenticate('jive'));

router.get('/auth/jive/callback',
  passport.authenticate('jive', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("req.session ",req.session);
    res.send("req.session " + req.session);
    /*
    request({
        url: 'https://vox-uat.sapient.com/api/core/v3/people/@me',
        headers: {
          'Authorization': 'Bearer '+ req.accessToken
        }
      }, function (error, response, body) {
        
    });
    
    res.send("req.user " + JSON.parse(req.user));
    */
});

module.exports = router;
