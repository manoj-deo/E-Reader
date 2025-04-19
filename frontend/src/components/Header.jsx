import React from 'react';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#6d4c41',
        color: '#fff',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Reader
        </Typography>
        <Button sx={{ color: '#fff' }} component={Link} to="/">Home</Button>
        <Button sx={{ color: '#fff' }} component={Link} to="/login">Login</Button>
        <Button sx={{ color: '#fff' }} component={Link} to="/about">About</Button>
        <Button sx={{ color: '#fff' }} component={Link} to="/signup">Signup</Button>
        <Button sx={{ color: '#fff' }} component={Link} to="/logout">Logout</Button>
      </Toolbar>
    </Box>
  );
};

export default Header;
