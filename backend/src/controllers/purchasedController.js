const mongoose = require('mongoose');
const User = require('../models/userModel');
const Content = require('../models/contentModel');
const PurchasedMovies = require('../models/purchasedModel');
const { ObjectId } = mongoose.Types

module.exports= {
    purchaseMovie: async (req, res) => {
        const movieId = req.params.movieId;
        const userEmail = req.userEmail; 
        
        try {
          const user = await User.findOne({ email: userEmail }); 
          const movie = await Content.findOne({ id: movieId });
          if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
          }
          user.purchasedMovies.push(movie._id);

          await User.updateOne({email: user.email}, user)
      
          const purchasedMovie = new PurchasedMovies({ user: user._id, content: movie._id });
          await PurchasedMovies.create(purchasedMovie);
      
          res.status(201).json({ message: 'Compra realizada!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },
    getPurchasedMovies: async (req, res) => {
        const userEmail = req.userEmail;
  
        try {
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
    
            const purchasedMovies = await PurchasedMovies.find({ user: user._id }).populate('content');
    
            res.json({ purchasedMovies })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}