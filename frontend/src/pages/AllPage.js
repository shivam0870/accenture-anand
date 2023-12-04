import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { server } from '..';
import PokemonCard from '../components/PokemonCard';

const AllPage = () => {
 const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    getAllPoke();
  }, [])

  const getAllPoke= async()=>{
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/pokemon/all`,
        
        {
          withCredentials: true,
        }
      );
      setAllPokemon(data.pokemon);
      setLoading(false);

      
      
    } catch (e) {
      toast.error(e.response.data.message);
      setLoading(false);

    }
  }

  return (
   

    <Container sx={{ py: 4 }} maxWidth="md">
      <Typography textAlign="center" gutterBottom variant="h4" component="h2"mb={4}>
        All Available Pokemon
      </Typography>
      {loading && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}><CircularProgress size={50} /></Box>}
      {allPokemon.length === 0 && !loading ? <Typography textAlign="center" gutterBottom variant="body1" component="h5" mb={4}>
        All the Pokemon have been adapted
      </Typography> 
      :
      <Grid container spacing={4}>
        {allPokemon.map((p) => (
          <PokemonCard key={p.name} {...p} isAllPage={true} />
        ))}

      </Grid>}
    </Container>

  );

}

export default AllPage