import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const HomePage = () => {
  return (
    <div>
      {/* AppBar with Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Reader
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to E-Reader
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Discover, upload, and enjoy a customizable digital reading experience.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2">
                Personal Library
              </Typography>
              <Typography>
                Securely manage your collection of digital books and settings.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2">
                Integrated Reader
              </Typography>
              <Typography>
                Enjoy customizable reading modes with adjustable fonts, brightness, and note-taking.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2">
                Community & Marketplace
              </Typography>
              <Typography>
                Browse, purchase, and discuss books with fellow readers.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
