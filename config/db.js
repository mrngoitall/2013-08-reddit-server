var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;


module.exports = function(app, config) {
  mongoose.connect(config.db);

  // Setup database and UserSchema
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));

  var userSchema = mongoose.Schema({ 
    username: String,
    password: String,
    email: String,
    sessionId: String
  });

  userSchema.methods.verifyPassword = function(password) {
    return password === this.password;
  };

  var User = mongoose.model('User', userSchema);

  // var testUser = new User({ 
  //   username: 'test',
  //   password: 'tester',
  //   email: 'sometest@gmail.com',
  //   sessionId: '' });

  // testUser.save();

  return db;
}