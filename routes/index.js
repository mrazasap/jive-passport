var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Index');
});

router.get('/profile', function (req, res) {
    res.send("Authenticated");
});

router.get('/auth/jive', passport.authenticate('jive'));

router.get('/auth/jive/callback',
  passport.authenticate('jive', { failureRedirect: '/' }),
  function(req, res) {
    res.send("req.user "+req.user);
});

module.exports = router;
