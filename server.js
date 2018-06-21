const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
// Auth
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const JwtOptions = {};
JwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
JwtOptions.secretOrKey = 'movieratingappSecretKet';

const app = express()
//const router = express.Router()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(passport.initialize());

mongoose.connect('mongodb://rejam:movies123@ds159020.mlab.com:59020/movies', 
() => {
  console.log('Connection has been made');
})
.catch(err => {
  console.error('App starting error:', err.stack);
  process.exit(1);
});

// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
  if(file.substr(-3) == ".js") {
  const route = require("./controllers/" + file)
  route.controller(app)
  }
})

const port = process.env.API_PORT || 8081;
app.listen(port, () => {
  console.log(`api running on port ${port}`);
}); 