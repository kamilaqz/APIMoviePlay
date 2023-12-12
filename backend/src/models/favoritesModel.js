const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteMovieSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
});

module.exports = mongoose.model('FavoriteMovie', favoriteMovieSchema);
 