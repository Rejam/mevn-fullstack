const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
      // store hashed password
      const newUserResource = newUser;
      newUserResource.password = hash;
      newUserResource.save(callback)
    });
  });
};

module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

module.exports.comparePassword = (enteredPassword, hash, callback) => {
  bcryptjs.compare(enteredPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};