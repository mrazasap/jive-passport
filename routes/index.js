var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

    
/* GET home page. */
router.get('/', function(req, res, next) {
    passport.use(new FacebookStrategy({
        clientID: '1625897364358758',
        clientSecret: '0426635717cc6c36d13102da97cc6780',
        callbackURL: "https://passport-jive.herokuapp.com/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        res.send(accessToken, refreshToken, profile, done);
        /*
        User.findOrCreate(..., function(err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
        */
      }
    ));
});
router.get('/callback', function () {
    console.log("Callback");
    res.send("Callback");
})

module.exports = router;
