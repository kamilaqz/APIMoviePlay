const express = require('express');
const favoriteRouter = express.Router();
const WithAuth = require('../middlewares/auth'); 
const favoritesController = require('../controllers/favoritesController');

favoriteRouter.route('/favorites/create/:movieId')
  .post(WithAuth, (req, res) => favoritesController.addFavorite(req, res)); 

favoriteRouter.route('/favorites/delete/:movieId')
  .delete(WithAuth, (req, res) => favoritesController.removeFavorite(req, res));

favoriteRouter.route('/favorites')
  .get(WithAuth, (req, res) => favoritesController.getFavorites(req, res)); 

module.exports = favoriteRouter; 

