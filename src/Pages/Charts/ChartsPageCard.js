import React from 'react';

import { Grid, Paper } from '@mui/material'

function ChartsPageCard(props) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        {props.children}
      </Paper>
    </Grid>
  );
}

export default ChartsPageCard
