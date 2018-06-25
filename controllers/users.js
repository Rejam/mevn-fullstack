const User = require('../models/User');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
  // local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false);
      });
      return true;
    })
  }))

  // user login
  app.post('/users/login', 
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
      res.redirect('/');  
  });

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
  
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

}