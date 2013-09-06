var express     = require('express'),
    passport    = require('passport'),
    mongoStore  = require('connect-mongo')(express),
    path        = require('path');

module.exports = function(app, config) {
  app.set('showStackError', true);

  app.set('root', config.root);
  app.set('views', path.join(config.root, 'app', 'views'));
  app.set('view engine', 'jade');

  // Middleware
  app.use(express.static(path.join(config.root, 'public')));

  // Don't log during test
  if (config.env !== 'test')
      app.use(express.logger('dev'));

  // Enable jsonp
  app.enable('jsonp callback name', 'callback');

  // Configure app
  app.configure(function() {
    // Cookie parser
    app.use(express.cookieParser());

    // body parser
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Setup CORS
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', config.clientUrl);
      res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
      res.header('Access-Control-Allow-Credentials', 'true');
      if (req.method === 'OPTIONS') {
        res.send(200);
      } else {
        next();
      }
    });

    // Sessions
    app.use(express.session({
      secret: config.app.secret,
      store: new mongoStore({ url: config.db })
    }));

    // Use passport
    app.set('passport', passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // Our app
    app.use(app.router);
  });
}