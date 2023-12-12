import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Box, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import './homeStyle.css'
import httpService from '../../services/httpService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [library, setLibrary] = useState([]);
    const storedLibrary = JSON.parse(localStorage.getItem('library')) || [];

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setIsDrawerOpen(open);
    };

    const handleSignOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    useEffect(() => {
        async function fetchMovies() {
          try{
            const response = await httpService.getContents()
            const movies = await response.json()
            setMovies(movies)
          } catch (error) {
            console.error("Erro")
          }
        }
        fetchMovies()
    } , [])

    const handleLibrary = async (selectedMovie) => {
        try {
            const response = await httpService.getLibrary();
            const libraryData = await response.json();
            const moviesLibrary = libraryData.favorites;
    
            const isMovieInLibrary = moviesLibrary.some(favorite => favorite.content.id === selectedMovie.id);
    
            if (isMovieInLibrary) {
                try {
                    const updatedLibrary = moviesLibrary.filter(favorite => favorite.content.id !== selectedMovie.id);
                    
                    await httpService.removeLibrary(selectedMovie.id); // Endpoint para remover do banco de dados
                    setLibrary(updatedLibrary);
                    localStorage.setItem('library', JSON.stringify(updatedLibrary));
                    toast.success('Filme removido da biblioteca com sucesso!');
                } catch (error) {
                    console.error('Erro ao remover o filme da biblioteca:', error);
                    toast.error('Erro ao remover o filme da biblioteca.');
                }
            } else {
                const updatedLibrary = [...moviesLibrary, { content: selectedMovie }];
    
                try {
                    await httpService.addLibrary(selectedMovie.id); // Endpoint para adicionar ao banco de dados
                    setLibrary(updatedLibrary);
                    localStorage.setItem('library', JSON.stringify(updatedLibrary));
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
    
    
    const goTo = (movie) => {
        return () => {
          navigate("/description", {state: {movie}})
        }
        
    }

    const Cards = (movies) => (
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
          {movies && movies.map((card, index) => (
            <Box key={index} width="200px" marginBottom="13px">
                <Card key={index} sx={{ maxWidth: 300, mt: 5 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={card.coverUrl}
                    alt={card.alt}
                />
                <CardContent>
                    <Typography gutterBottom component="div" className='title'>
                    {card.title}
                    </Typography>
                    <Box>
                        <IconButton onClick={() => handleLibrary(card)}>
                        {storedLibrary.some(movie => movie.content.id === card.id) ? (
                                <CheckIcon className='icon' sx={{ color: 'black' }} />
                            ) : (
                                <AddIcon className='icon' sx={{ color: 'black' }}/>
                            )}
                        </IconButton>
                        <Button type="submit" sx={{ mt: 1 }} style={{marginLeft: -15}} variant="outlined" size="small" onClick={goTo(card)}>
                            Detalhe
                        </Button>
                    </Box>
                </CardContent>
                </Card>
            </Box>
          ))}
        </Box>
    )

    const list = (
        <Box
            sx={{ width: 250, bgcolor: "primary.main", minHeight: '100vh' }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}   
        >
            <List >
                <ListItem>
                    <Button component={RouterLink} to="/library">
                        <ListItemIcon className='item_icon'>
                            <FavoriteIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Minha Lista" className='text_menu'/>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={RouterLink} to="/purchased">
                        <ListItemIcon className='item_icon'>
                            <VideoLibraryIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Filmes Comprados" className='text_menu'/>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button onClick={handleSignOut}>
                        <ListItemIcon className='item_icon'>
                            <LogoutIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Sair" className='text_menu'/>
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

  return (
    <>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
            <Box className='moviePlay'>
                <Typography variant="h6" color="inherit" noWrap className='moviePlay_text'>
                    MoviePlay
                </Typography>
            </Box>
  
            <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                <AccountCircleIcon fontSize='large'/>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {list}
        </Drawer>

        <main>
            <Box style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px' }}>
                <Typography className='category' style={{ marginTop: '90px'}}>
                    Filmes
                </Typography>
                <Box>
                    {Cards(movies)}
                </Box>
            </Box>
        </main>
        <ToastContainer />
    </> 
  )
}

export default Home