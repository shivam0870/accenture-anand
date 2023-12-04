
import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Context, server } from '..';


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


const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated } =
    React.useContext(Context);

  const [loading, setLoading] = useState()

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            

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
                autoComplete="password"
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
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/register"} >
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>

  );
}

export default LoginPage