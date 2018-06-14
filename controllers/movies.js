const Movie = require('../models/Movie')

module.exports.controller = app => {
  // add new movie
  app.post('/movies', (req, res) => {
    const newMovie = new Movie(req.body)

    newMovie.save( (err, movie) => {
      if (err) {console.error(err)}
      res.send(movie)
    })
  })
}