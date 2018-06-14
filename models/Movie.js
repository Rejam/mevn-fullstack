const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  name: String,
  desc: String,
  release_year: Number,
  genre: String,
})

module.exports = mongoose.model('Movie', MovieSchema)