import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import httpService from '../../services/httpService'
import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import './loginStyle.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoginDisabled) {
            return;
        }

        setIsLoginDisabled(true)
        setLoginDisabledTimeout(setTimeout(() => setIsLoginDisabled(false), 8000))
        const formData = new FormData(e.currentTarget)
        const data = {}
        for(const [key, value] of formData) {
            data[key] = value
        }

        try {
            const response = await httpService.login(data)

            if (response.success) { 
                localStorage.setItem("token", response.token)
                navigate("/home")
            } else {
                toast.error(response.error);
            }
        } catch (err) {
            toast("Erro ao realizar login!");
        }
    }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  return (
    <>
        <Paper elevation={3} className="paper-container"> 
            <Container component="main">
                <Box className='login-box'>
                    <Typography className='signIn'>
                        Entrar
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Box className='container'>
                            <TextField required fullWidth margin="normal" name="email" type="email" label="E-mail" className='custom-textfield'/>
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
                                <Button type="submit" fullWidth sx={{bgcolor: "primary.main", mt: 2}} variant='contained'> Login </Button>
                                <Link className='link'> Esqueceu a senha? </Link>
                            </Box>
                            <Box className='container3'>
                                <Typography className='text'>
                                    Não tem uma conta?
                                </Typography>
                                <Link className='link2' to='/user/create'> Criar Conta </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <ToastContainer/>
        </Paper>
    </>
  )
}

export default Login