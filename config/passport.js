var mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    LocalStrategy   = require('passport-local').Strategy;
    RedditStrategy  = require('passport-reddit').Strategy;

module.exports = function(app, config) {
  var passport = app.get('passport');
  // Implement the passport local strategy
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {

  });

  passport.deserializeUser(function(sessionId, done) {
    findBySessionId(sessionId, function(err, user) {
      done(err, user);
    });
  });
}

var findBySessionId = function(sessionId, fn) {
  User.findOne({ sessionId: sessionId }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
  })
}