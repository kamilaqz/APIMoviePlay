import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import httpService from '../../services/httpService'
import './libraryStyle.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Library = () => {
  const navigate = useNavigate()
  const [purchasedMovies, setPurchasedMovies] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
      }
      setIsDrawerOpen(open);
  };

  useEffect(() => {
    const fetchPurchasedMovies = async () => {
      try {
        const response = await httpService.getLibrary();
        if (response.ok) {
          const responseData = await response.json();
          const moviesData = responseData.favorites;
          console.log("Dados dos filmes:", moviesData);
          setPurchasedMovies(moviesData);
        } else {
          toast.error('Não foi possível acessar os filmes')
        }
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    };

    fetchPurchasedMovies(); 
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token")
    navigate('/')
  }

  const removeMovieFromLibrary = async (movieId) => {
    try {
      const response = await httpService.removeLibrary(movieId);
      if (response.ok) {
        const updatedMovies = purchasedMovies.filter((movie) => movie.content.id !== movieId);
        setPurchasedMovies(updatedMovies);
        updateLocalStorage(updatedMovies); // Atualiza o localStorage
        toast.success('Filme removido da biblioteca com sucesso!');
      } else {
        toast.error('Erro ao remover o filme da biblioteca.');
      }
    } catch (error) {
      console.error('Erro ao remover o filme:', error);
      toast.error('Erro ao remover o filme da biblioteca.');
    }
  };
  
  const updateLocalStorage = (updatedMovies) => {
    const updatedFavorites = updatedMovies.map((movie) => ({ content: movie.content }));
    localStorage.setItem('library', JSON.stringify(updatedFavorites));
  };

  const EmptyMovies = ()=> {
    return (
      <Container sx={{ py: 3 }} maxWidth="md" className='no_movies'>Nenhum filme na biblioteca</Container>
    )
  }

  const list = (
    <Box
        sx={{ width: 250, bgcolor: "primary.main", minHeight: '100vh' }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}   
    >
        <List >
            <ListItem>
                <Button component={RouterLink} to="/home">
                    <ListItemIcon className='item_icon'>
                        <HomeIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" className='text_menu'/>
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
  
  const ListMovies = ({purchasedMovies}) => {
    return (
      <Container sx={{ py: 3 }} maxWidth="">
        <Typography className='list' style={{ marginTop: '60px'}}>
          Minha Lista
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={4}>
          {purchasedMovies.map((favorite, index) => (
            <Box key={index} width="200px" marginBottom="13px">
              <Card key={index} sx={{ maxWidth: 300, mt: 5 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={favorite.content.coverUrl}
                    alt={favorite.content.alt}
                />
                <CardContent>
                    <Typography gutterBottom component="div" className='title'>
                    {favorite.content.title}
                    </Typography>
                    <Button type="submit" sx={{ mt: 1 }} variant="outlined" size="small" onClick={() => removeMovieFromLibrary(favorite.content.id)}>
                      Remover
                    </Button>
                </CardContent>
                </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  };

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
            {purchasedMovies.length !== 0 ? (
              <ListMovies purchasedMovies={purchasedMovies} />
            ) : (
              <EmptyMovies />
            )}        
          </Box>
        </main>
        <ToastContainer/>
        </> 
    );

}

export default Library