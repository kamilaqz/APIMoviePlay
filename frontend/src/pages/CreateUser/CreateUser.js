import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper'
import httpService from '../../services/httpService'
import './createUserStyle.css';
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoginDisabled, setIsLoginDisabled] = useState(false)
  const [loginDisabledTimeout, setLoginDisabledTimeout] = useState(null)

  useEffect(() => {
    return () => {
        if (loginDisabledTimeout) { 
            clearTimeout(loginDisabledTimeout)
        }
    };
}, [loginDisabledTimeout])

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (isLoginDisabled) {
      return;
  }

  setIsLoginDisabled(true)
  setLoginDisabledTimeout(setTimeout(() => setIsLoginDisabled(false), 8000))

    const formData = new FormData(e.currentTarget);
    const data = {};
    
    for (const [key, value] of formData) {
      data[key] = value;
    }

    try{
      console.log(data)
      const response = await httpService.createUser(data);

      if (response.status === 201) {
        const result = await response.json();
        toast.success("Cadastro realizado com sucesso!")
        setTimeout(() => {
          navigate('/');
        }, 6000);
      } else if (response.status === 409) {
        const result = await response.json()
        if (result.message) {
          await toast.error(result.message)
        }
      } else {
        const result = await response.json()
        toast("Erro ao realizar cadastro.")
      }
    } catch (err) {
      toast.error("Erro ao criar o usuário!");
      console.error(err);
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value) 
  };

  return (
    <Paper elevation={3} className="paper-container">
      <Container component="main">
        <Box className='createUser-box'>
          <Typography className='signUp'>
            Cadastro
          </Typography>

          <Box component="form" onSubmit={handleRegisterUser}>
            <Box className='container'>
              <TextField required fullWidth margin="normal" name="fullName" label="Nome Completo" className='custom-textfield'/>
              <TextField required fullWidth margin="normal" name="email" type='email' label="E-mail" className='custom-textfield'/>
              <TextField 
                required 
                fullWidth 
                margin="normal" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                label="Senha" 
                value={password}
                onChange={handlePasswordChange}
                className='custom-textfield'
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon sx={{color:'white'}} fontSize='small'/> : <VisibilityIcon sx={{color:'white'}} fontSize='small'/>}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
              />
              <Box className='container2'>
                <Button type="submit" fullWidth sx={{bgcolor: "primary.main", mt: 2}} variant='contained'> Registrar </Button>
              </Box>
              <Box className='container3' sx={{ height: '1px' }}>
                <Typography className='text'>
                    Já tem uma conta?
                </Typography>
                <Link className='link2' to='/'> Log in </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </Paper>
  )
}

export default CreateUser