import React, { useEffect, useState } from 'react'
import axios from "axios";
import { server } from '..';
import toast from 'react-hot-toast';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import PokemonCard from '../components/PokemonCard';

const AdoptedPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/pokemon/my`, {
        withCredentials: true,
      })
      .then((res) => {
        
        setPokemon(res.data.adoptedPokemon);
        setLoading(false);
        
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setLoading(false);
      });
  }, []);
  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Typography textAlign="center" gutterBottom variant="h4" component="h2" mb={4}>
        My Adopted Pokemon
      </Typography>
      {loading && <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}><CircularProgress size={50} /></Box>}
      {pokemon.length === 0 && !loading ? <Typography textAlign="center" gutterBottom variant="body1" component="h5" mb={4}>
        You have not Adopted any Pokemon yet
      </Typography> :<Grid container spacing={4}>
         {pokemon.map((p) => (
          <PokemonCard key={p.name} {...p}  />
        ))} 
        
      </Grid>
        
        }
    </Container>
  )
}

export default AdoptedPage