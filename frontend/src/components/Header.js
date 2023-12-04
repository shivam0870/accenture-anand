import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { Context, server } from '..';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } =
    useContext(Context);

  const [loading, setLoading] = useState()
  const navigate = useNavigate();
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Link style={{ flexGrow: 1, flexWrap: "noWrap", color:"inherit"}} to={'/'}>
        <Typography variant="h6">
          PokeAdopt
        </Typography>
        </Link>
        {isAuthenticated  && <nav>
          <Link to={"/my"}>
          <Typography
            variant="button"
            color="text.primary"
            
            sx={{ my: 1, mx: 1.5 }}
          >
            My Pokemon
          </Typography>
          </Link>
          <Link to={"/all"}>
          <Typography
            variant="button"
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
          >
            All Pokemon
          </Typography>
          </Link>
          <Link to={"/profile"}>
            <Typography
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Typography>
          </Link>
          
        </nav>}
        
        {!isAuthenticated ? (
          <>
          <Link to={"/register"}>
        <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Register
        </Button>
        </Link>
          <Link to="/login">
            <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </Link>
          </>
        ) : (
          <Button disabled={loading} onClick={logoutHandler} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Header