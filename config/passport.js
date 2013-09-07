var mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    LocalStrategy   = require('passport-local').Strategy;

module.exports = function(app, config) {
  var passport = app.get('passport');
  // Implement the passport local strategy
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        console.log('finding users');
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user'}); }
        if (!user.verifyPassword(password)) { return done(null, false, {message: 'Invalid password'}); }
        user.sessionId = user._id;
        console.log(user);
        user.save();
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log('serializing user');
    User.findOne({ username:user.username }, function(err, user) {
      if (err) { return done(null, false, {message: 'Unable to initialize session'}); }
      done(null, user.sessionId);
    })
  });

  passport.deserializeUser(function(sessionId, done) {
    console.log('deserializing user');
    findBySessionId(sessionId, function(err, user) {
      done(err, user);
    });
  });
};

var findBySessionId = function(sessionId, fn) {
  User.findOne({ sessionId: sessionId }, function(err, user) {
    if (err) { return fn(err); }
    if (!user) { return fn(null, false); }
    return fn(null, user);
  })
};

var sessionIdGenerator = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}