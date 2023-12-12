const express = require('express');
const purchasedRouter = express.Router();
const WithAuth = require('../middlewares/auth'); 
const purchasedController = require('../controllers/purchasedController');

purchasedRouter.route('/purchase/create/:movieId')
  .post(WithAuth, (req, res) => purchasedController.purchaseMovie(req, res)); 

purchasedRouter.route('/purchased')
  .get(WithAuth, (req, res) => purchasedController.getPurchasedMovies(req, res)); 

module.exports = purchasedRouter;

