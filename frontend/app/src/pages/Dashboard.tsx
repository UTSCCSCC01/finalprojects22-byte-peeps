import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import {Box, Grid, Paper} from '@mui/material' 

export interface IDashProps {};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Dashboard: React.FunctionComponent<IDashProps> = (props) => {
    const navigate = useNavigate();
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/surveys')}>Surveys</button>
      <button onClick={() => navigate('/reviews')}>Review Apps</button>
      <button onClick={() => navigate('/socials')}>Social Media</button>
      <Box sx={{ flexGrow: 1 , p:2}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>charts/stats, to be added</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard
