var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var passport = require('passport');
var http = require('http');
var FacebookStrategy = require('passport-facebook').Strategy;
var JiveStrategy = require('passport-jive-oauth').Strategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'mns' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '1625897364358758',
    clientSecret: '0426635717cc6c36d13102da97cc6780',
    callbackURL: "https://passport-jive.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    console.log("profile");
    process.nextTick(function () {
      console.log("nextTick");
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

/* Jive strategy */
passport.use('jive-npm', new JiveStrategy({
    authorizationURL: 'https://vox-uat.sapient.com/oauth2/authorize',
    tokenURL: 'https://vox-uat.sapient.com/oauth2/token',
    clientID: '92jwrw3byejbcews47swxnvm43831m3i.i',
    clientSecret: 'f6ncrzsqz7mxys8fk1a81jjjggwa7hi0.s',
    callbackURL: 'https://passport-jive.herokuapp.com/auth/jive-npm/callback',
    userProfileURL: 'https://vox-uat.sapient.com/api/core/v3/people/username/@me'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("profile", profile);
    var userProfile = JiveStrategy.userProfile(accessToken, done);
    console.log("userProfile", userProfile);
  }
));
/*
passport.use('jive', new OAuth2Strategy({
    authorizationURL: 'https://sandbox.jiveon.com/oauth2/authorize',
    tokenURL: 'https://sandbox.jiveon.com/oauth2/token',
    clientID: 'nyu4r5glggdn0lzemvdfrfyofanbyp13.i',
    clientSecret: 'cs3hnjs45kdzehijw604z0vlxwpadz8s.s',
    callbackURL: 'https://passport-jive.herokuapp.com/auth/jive/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    
    done(err, user);

  }
));
*/

module.exports = app;
