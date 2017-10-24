var express = require('express')
var router = express.Router();


var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy



/* GET auth . */


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  done(null, id)
});



var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'e81f235b26788a6df55a',
    clientSecret: '9d8e2caf37d2fb07eb877f42ab006bf31a1858e8',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({
    //   githubId: profile.id
    // }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null, profile);
  }
));




router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    //avatar_url
    //login

    //console.log(req)
    req.session.user = {
      id : req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url
    }

    res.redirect('/');
  });

  router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})



module.exports = router;