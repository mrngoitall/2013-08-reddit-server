var passport      = require('passport');
var mongoose        = require('mongoose'),
    User            = mongoose.model('User');

module.exports = function(app, config) {
  // Setup API blockade
  app.all('/api/*', function(req, res, next) {
    // passport gives us a 'isAuthenticated' method
    // we'll check this method
    if (req.isAuthenticated()) return next();

    return res.send(401, 'Unauthorized');
  });

/*function(err, data, info) {
      console.log("AUTH", err, data, info);
    })*/

  // Auth
  app.post('/login', 
    passport.authenticate('local', { 
      successRedirect: '/successredirect',
      successFlash: "Successful login!",
      failureRedirect: '/loginagain', 
      failureFlash: "Invalid username or password" }),
    function(req, res, next) {
      // Implement login
      res.redirect('/success');
  }
  );

  app.post('/signup', function(req, res, next) {
    // Implement signup


    // Confirm that this username isn't already taken
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) { return err; }
      if (user) { 
        res.send(200,{ message: 'Username already taken'});
      } else {
        var newUser = new User({ 
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        sessionId: '' });

        newUser.save();

        res.send(200,{sessionId: newUser._id});
      };
    });

  });

  app.get('/api/news', function(req, res, next) {
    // Implement news api
  });

  app.get('/api/rate', function(req, res, next) {
    // Implement news rating
  });
}