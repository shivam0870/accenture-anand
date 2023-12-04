
import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Context, server } from '..';
import axios from "axios"
import toast from "react-hot-toast";
import { Link, Navigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        PokeAdopt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const RegisterPage = () => {
  const { isAuthenticated, setIsAuthenticated} =
    useContext(Context);

  const [loading, setLoading] = useState()
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      toast.success(data.message);
       setIsAuthenticated(true);
       setLoading(false);
    } catch (error) {
    
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
       setLoading(false);
    }

  };
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    
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
          
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
            disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    
  );
}

export default RegisterPage