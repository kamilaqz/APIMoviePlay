const mongoose = require('mongoose');
const User = require('../models/userModel');
const Content = require('../models/contentModel');
const FavoriteMovie = require('../models/favoritesModel');
const { ObjectId } = mongoose.Types

module.exports= {
    addFavorite: async (req, res) => {
        const movieId = req.params.movieId;
        const userEmail = req.userEmail; 
        
        try {
          const user = await User.findOne({ email: userEmail });
          const movie = await Content.findOne({ id: movieId });
          if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
          }
          user.favoriteMovies.push(movie._id);

          await User.updateOne({email: user.email}, user)
      
          const favoriteMovie = new FavoriteMovie({ user: user._id, content: movie._id });
          await FavoriteMovie.create(favoriteMovie);
      
          res.status(201).json({ message: 'Filme adicionado aos favoritos com sucesso.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },
    removeFavorite: async (req, res) => {
        const movieId = req.params.movieId;
        const userEmail = req.userEmail;
    
        try {
            const user = await User.findOne({ email: userEmail });
            const movie = await Content.findOne({ id: movieId });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            
            const movieIndex = user.favoriteMovies.indexOf(movie._id);
    
            if (movieIndex === -1) {
                return res.status(404).json({ message: 'Filme não encontrado nos favoritos.' });
            }
    
            user.favoriteMovies.splice(movieIndex, 1);
    
            await User.updateOne({ email: user.email }, user);
    
            await FavoriteMovie.findOneAndDelete({ user: user._id, content: movie._id });
    
            res.status(200).json({ message: 'Filme removido dos favoritos com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },
    getFavorites: async (req, res) => {
      const userEmail = req.userEmail;

      try {
          const user = await User.findOne({ email: userEmail });
          if (!user) {
              return res.status(404).json({ message: 'Usuário não encontrado.' });
          }
  
          const favorites = await FavoriteMovie.find({ user: user._id }).populate('content');
  
          res.json({ favorites });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro interno do servidor.' });
      }
  }
}