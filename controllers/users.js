const User = require('../models/User');

module.exports.controller = (app) => {
  // register new user
  app.post('/users/register', (req, res) => {
    const newUser = new User(req.body.user);
    User.createUser(newUser, (err, user) => {
      if (err) { 
        res.status(422).json({
          message: 'Something went wrong. Please try again shortly',
        });
      }
      res.send({ user });
    })
  })
}