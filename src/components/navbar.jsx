import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Tree Map', path: '/map' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin', path: '/admin' });
  }

  if (user) {
    navItems.push({ label: 'Profile', path: '/profile' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#388e3c' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Branding Section (Stacked Vertically) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
            GREENIFY
          </Typography>
          <Box sx={{ fontFamily: 'Roboto Mono', fontSize: '0.8rem', color: 'white', mt: '-2px' }}>
            Tree Plantation Tracker
          </Box>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                color: 'white',
                '&.active': {
                  borderBottom: '2px solid white',
                  fontWeight: 'bold'
                }
              }}
            >
              {item.label}
            </Button>
          ))}

          {!user ? (
  <>
    <Button
      component={NavLink}
      to="/login"
      variant="outlined"
      sx={{
        color: 'white',
        borderColor: 'white',
        ml: 1,
        '&:hover': {
          backgroundColor: 'white',
          color: '#388e3c',
          borderColor: 'white',
        },
        '&.active': {
          backgroundColor: '#dcdcdc',
          color: '#388e3c',
          fontWeight: 'bold',
        }
      }}
    >
      Login
    </Button>
    <Button
      component={NavLink}
      to="/register"
      variant="contained"
      sx={{
        backgroundColor: '#dcdcdc',
        color: '#388e3c',
        ml: 1,
        '&:hover': {
          backgroundColor: '#c8e6c9',
        },
        '&.active': {
          backgroundColor: '#a5d6a7',
          fontWeight: 'bold',
        }
      }}
    >
      Register
    </Button>
  </>
) : (
  <Button
    onClick={handleLogout}
    variant="outlined"
    sx={{
      color: 'white',
      borderColor: 'white',
      ml: 1,
      '&:hover': {
        backgroundColor: 'white',
        color: '#388e3c',
        borderColor: 'white',
      }
    }}
  >
    Logout
  </Button>
)}


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
