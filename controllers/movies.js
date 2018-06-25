const Movie = require('../models/Movie');
const Rating = require('../models/Movie');

module.exports.controller = app => {
  // fetch all movies
  app.get('/movies', 
  (req, res) => {
    Movie.find({}, 
      'name desc release_year genre', 
      (err, movies) => {
        if (err) { console.error(err); }
        res.send({movies})
      })
  })

  // fetch a single movie
  app.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, 
    'name desc release_year genre',
    (err, movie) => {
      if (err) { console.error(err);}
      res.send(movie)
    })
  })

  // add new movie
  app.post('/movies', (req, res) => {
    const newMovie = new Movie(req.body)

    newMovie.save( (err, movie) => {
      if (err) {console.error(err)}
      res.send({movie})
    })
  })

  // rate a movie
  app.post('/movies/rate/:id', (req, res) => {
    const rating = new Rating({
      movie_id: req.parma.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    })

    rating.save((err, rating) => {
      if (err) { console.error(err) }; 
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate,
      })
    })
  })
}