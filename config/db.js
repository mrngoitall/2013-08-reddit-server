var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;


module.exports = function(app, config) {
  //mongoose.connect(config.db);
  mongoose.connect('mongodb://localhost/mydb');

  // Setup database and UserSchema
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));

  var userSchema = mongoose.Schema({ 
    username: String,
    profileId: String
  });

  var User = mongoose.model('User', userSchema);


  return db;
}