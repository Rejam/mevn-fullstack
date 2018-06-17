const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  movie_id: String,
  user_id: String,
  rate: Number,
});

module.exports = mongoose.model('Rating', RatingSchema);