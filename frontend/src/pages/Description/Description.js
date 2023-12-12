import React, { useEffect, useState } from 'react';
import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import httpService from '../../services/httpService'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './descriptionStyle.css';

const Description = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    const year = new Date(movie.year).getFullYear();
    const storedLibrary = JSON.parse(localStorage.getItem('library')) || [];
    const storedPurchased = JSON.parse(localStorage.getItem('purchased')) || [];
    const [isInLibrary, setIsInLibrary] = useState(false);
    const [purchasedMovies, setPurchasedMovies] = useState(false);

    useEffect(() => {
      setIsInLibrary(storedLibrary.some((storedMovie) => storedMovie.content.id === movie.id));
    }, [storedLibrary, movie]);

    useEffect(() => {
        setPurchasedMovies(storedPurchased.some((storedpurchase) => storedpurchase.content.id === movie.id));
      }, [storedPurchased, movie]);

    const handleLibrary = async () => {
      try {
          const response = await httpService.getLibrary();
          const libraryData = await response.json();
          const moviesLibrary = libraryData.favorites;

          const isMovieInLibrary = moviesLibrary.some((favorite) => favorite.content.id === movie.id);

          if (isMovieInLibrary) {
              try {
                  const updatedLibrary = moviesLibrary.filter((favorite) => favorite.content.id !== movie.id);

                  await httpService.removeLibrary(movie.id); 
                  localStorage.setItem('library', JSON.stringify(updatedLibrary));
                  setIsInLibrary(false);
                  toast.success('Filme removido da biblioteca com sucesso!');
              } catch (error) {
                  console.error('Erro ao remover o filme da biblioteca:', error);
                  toast.error('Erro ao remover o filme da biblioteca.');
              }
          } else {
              const updatedLibrary = [...moviesLibrary, { content: movie }];

              try {
                  await httpService.addLibrary(movie.id); 
                  localStorage.setItem('library', JSON.stringify(updatedLibrary));
                  setIsInLibrary(true);
                  toast.success('Filme adicionado à biblioteca com sucesso!');
              } catch (error) {
                  console.error('Erro ao adicionar o filme à biblioteca:', error);
                  toast.error('Erro ao adicionar o filme à biblioteca.');
              }
          }
      } catch (error) {
          console.error('Erro ao verificar a biblioteca:', error);
          toast.error('Erro ao verificar a biblioteca.');
      }
    };

    const handlePurchaseMovie = async () => {
        try {
            const response = await httpService.getMovie();
            const purchaseData = await response.json();
            console.log('RESPOSTA DO BANCOO:', purchaseData)
            const moviesPurchased = purchaseData.purchasedMovies;

            console.log("dados", moviesPurchased)
    
            const isMovieInPurchase = moviesPurchased.some((purchased) => purchased.content.id === movie.id);
    
            if (!isMovieInPurchase) {
                const updatedPurchase = [...moviesPurchased, { content: movie }];
    
                try {
                    await httpService.addMovie(movie.id);
                    localStorage.setItem('purchased', JSON.stringify(updatedPurchase));
                    console.log('AAAAAAA', updatedPurchase)
                    setPurchasedMovies(true);
                    toast.success('Filme comprado com sucesso!!');
                } catch (error) {
                    console.error('Erro ao comprar o filme!!:', error);
                    toast.error('Erro ao comprar o filme!.');
                }
            } else {
                toast.info('Filme já foi comprado.');
            }
        } catch (error) {
            console.error('Erro ao verificar os filmes comprados:', error);
            toast.error('Erro ao verificar os filmes comprados.');
        }
    };
    

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <IconButton component={RouterLink} to="/home">
                        <ArrowBackIosNewIcon sx={{ color: 'white' }} className='item_logout' />
                    </IconButton>
                    <Box className='moviePlay'>
                        <Typography variant="h6" color="inherit" noWrap className='moviePlay_text_'>
                            MoviePlay
                        </Typography>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <AccountCircleIcon fontSize='large' />
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <Box style={{ backgroundColor: 'black', minHeight: '91.5vh', padding: '20px' }}>
                    {movie && (
                        <Box className='movie-details'>
                            <img src={movie.coverUrl} alt={movie.alt} className='movie-poster'/>
                            <Typography className='movie-title'>{movie.title}</Typography>
                            <Box className='movie-settings'>
                              <Typography className='movie-year'>{year}</Typography>
                              <Typography className='movie-category'>{movie.category}</Typography>
                            </Box>
                            <Typography className='movie-synopsis'>{movie.synopsis}</Typography>
                            <Typography className='movie-price'>R${movie.price}</Typography>
                            <Box className='buttons'>
                              <IconButton onClick={handleLibrary}>
                                  {isInLibrary ? (
                                      <CheckIcon className='icon' sx={{ color: 'white' }} fontSize='large' />
                                  ) : (
                                      <AddIcon className='icon' sx={{ color: 'white' }} fontSize='large' />
                                  )}
                                </IconButton>
                              <Button type="submit" sx={{ mt: 1 }} style={{marginLeft: -15}} variant="contained" size='large' onClick={handlePurchaseMovie}>
                                  Comprar
                              </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </main>
            <ToastContainer/>
        </>
    );
};

export default Description;