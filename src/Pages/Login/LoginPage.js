import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { doLogin } from '../../Store/Actions/authActions'

import Copyright from '../../Components/Copyright/Copyright'
import AlertMessages from '../../Components/Messages/AlertMessages'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {   
  USER_MESSAGES_6_SECONDS_TIMER
} from '../../ValueObjects/Enum/userFormEnum'

const theme = createTheme();

function LoginPage(props) {
  const [showLoginValidatorMessage, setShowLoginValidatorMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginFormData = {
      email: data.get('email'),
      password: data.get('password'),
    }    
    handleLoginMessage();
    props.doLoginWithFormData({...loginFormData});    
  };

  const handleLoginMessage = () => {
    setShowLoginValidatorMessage(true)
    function doActions() {
      setShowLoginValidatorMessage(false)
    }    
    setTimeout(doActions, USER_MESSAGES_6_SECONDS_TIMER)    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acesso ao <strong>Monitor Dashboard</strong>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  href="/" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />      
            {showLoginValidatorMessage && 
              <AlertMessages 
                message={props?.auth?.isFailAuth && 'Não foi possível realizar o login. Verifique as informações e tente novamente...'}
                type="success"
              />}            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ACESSAR
            </Button>                     
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doLoginWithFormData(loginData) {
      const action = doLogin(loginData)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)