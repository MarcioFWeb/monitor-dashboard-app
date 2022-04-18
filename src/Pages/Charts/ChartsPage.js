import * as React from 'react';

import { Container, Grid } from '@mui/material'

import ChartCPUUsage from '../../Components/Chart/ChartCPUUsage';
import ChartMemoryUsage from '../../Components/Chart/ChartMemoryUsage';
import StatusInfo from '../../Components/StatusInfo/StatusInfo';
import ChartsPageCard from '../Charts/ChartsPageCard';

function ChartsPageContent() {
  return (    
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* ChartCPUUsage */}
        <ChartsPageCard>
          <ChartCPUUsage />
        </ChartsPageCard>   
        {/* ChartMemoryUsage */}
        <ChartsPageCard>
          <ChartMemoryUsage />
        </ChartsPageCard>            
        {/* StatusInfo */}
        <ChartsPageCard>
          <StatusInfo />
        </ChartsPageCard>
      </Grid>
    </Container>      
  );
}

export default function ChartsPage() {
  return <ChartsPageContent />;
}
