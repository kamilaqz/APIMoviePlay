import React, { useEffect, useState } from 'react'
import './purchasedStyle.css'
import { AppBar, Button, Card, CardContent, CardMedia, Container, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import httpService from '../../services/httpService'
import { Box } from '@mui/system';

const Purchased = () =>  {
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [purchasedMovies, setPurchasedMovies] = useState([]);

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
        const fetchPurchasedMovies = async () => {
            try {
            const response = await httpService.getMovie();
            if (response.ok) {
                const responseData = await response.json();
                const moviesData = responseData.purchasedMovies;
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

    const EmptyMovies = ()=> {
    return (
        <Container sx={{ py: 3 }} maxWidth="md" className='no_movies'>Nenhum filme comprado</Container>
    )
    }

    const list = (
        <Box
            sx={{ width: 250, bgcolor: "primary.main", minHeight: '100vh' }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}   
        >
            <List>
                <ListItem>
                    <Button component={RouterLink} to="/home">
                        <ListItemIcon className='item_icon'>
                            <HomeIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" className='text_menu'/>
                    </Button>
                </ListItem>
                <ListItem>
                    <Button component={RouterLink} to="/library">
                        <ListItemIcon className='item_icon'>
                            <FavoriteIcon sx={{color: 'white'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Minha Lista" className='text_menu'/>
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
            {purchasedMovies.map((purchasedMovies, index) => (
            <Box key={index} width="200px" marginBottom="13px">
                <Card key={index} sx={{ maxWidth: 300, mt: 5 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={purchasedMovies.content.coverUrl}
                    alt={purchasedMovies.content.alt}
                />
                <CardContent>
                    <Typography gutterBottom component="div" className='title'>
                    {purchasedMovies.content.title}
                    </Typography>
                    <Button type="submit" sx={{ mt: 1 }} variant="outlined" size="small">
                        <PlayArrowIcon className='iconPlay'/>
                        Assistir
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
  )
}

export default Purchased