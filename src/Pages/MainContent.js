import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import MenuItems from '../Components/MenuItems/MenuItems';
import Copyright from '../Components/Copyright/Copyright';
import ChartsPage from './Charts/ChartsPage';
import UsersPage from './Users/UsersPage';

import { doLogout } from '../Store/Actions/authActions';

import AppBar from '../Components/AppBar/AppBar';

import Drawer from '../Components/Drawer/Drawer';

const mdTheme = createTheme();

function MainContent(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMediumOrBiggerScreens = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {  
    props.doUserLogout();
  };

  useEffect(() => {    
    setOpen(isMediumOrBiggerScreens);    
  }, [isMediumOrBiggerScreens]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Monitor Dashboard
            </Typography>            
            <IconButton color="inherit">              
              <AccountCircleIcon sx={{ marginRight: 1 }} />
              <Typography variant="small" sx={{ fontSize: 15 }}>{`${props?.auth?.email}`}</Typography>
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={handleLogout}
              >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>          
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography variant="small" color={'primary'} sx={{ fontSize: 16 }}>Selecione uma opção:</Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MenuItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Routes>
            <Route path="/" element={<ChartsPage />} />
            <Route path="/users" element={<UsersPage />} />              
          </Routes>          
          
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doUserLogout() {
      const action = doLogout()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)