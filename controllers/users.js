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
  });

  // login a user
  app.post('/users/login', (req, res) => {
    if (req.body.email && req.body.password) {
      User.getUserByEmail(req.body.email, (err, user) => {
        if (!user) {
          res.status(404).json({message: 'The user does not exist!'});
        } else {
          User.comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (err) throw error;
            if (isMatch) {
              res.json({ message: 'ok'});
            } else {
              res.status(401).json({ message: 'The password is incorrect!'});
            }
          })
        }
      });
    }
  });
}