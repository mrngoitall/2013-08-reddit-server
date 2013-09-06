var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;


module.exports = function(app, config) {
  var db = mongoose.connect(config.db);

  // Setup database and UserSchema

  db.on('error', console.error.bind(console, 'connection error: '));

  db.once('open', function() {

    var userSchema = mongoose.Schema({ 
      username: String,
      password: String,
      salt: String
    });

    var User = mongoose.model('User', userSchema);

  });

  return db;
}