import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../Title/Title';
import { Box, Typography, Avatar } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoadingMessages from '../Messages/LoadingMessages';
import { CHART_URL_STATUS, DEFAULT_COLOR_INFO_CARD, GREEN_COLOR_INFO_CARD } from '../../ValueObjects/Helpers/chartDataHelper';

export default function StatusInfo() {

  const [loading, setLoading] = useState(true);
  const [statusData, setstatusData] = useState('');

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get(CHART_URL_STATUS);
        setstatusData(response?.status);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);
  
  const StatusInfoCard = (status) => {

    let color = DEFAULT_COLOR_INFO_CARD
    if (status === 'green') { color = GREEN_COLOR_INFO_CARD }    

    return (
      <>
        <Avatar sx={
          { 
            bgcolor: color,
            width: 60, 
            height: 60
          }}>
          <InfoOutlinedIcon />
        </Avatar>
        <Typography sx={{ textTransform: 'capitalize', marginTop: 1 }}>{status}</Typography>        
      </>
    )
  }

  return (
    <>    
    {loading && <LoadingMessages textMessage={'Aguarde, carregando dados...'} />}
    {!loading && (
      <>
        <Title>Cluster Status</Title>
        <>          
          <Box 
            sx={{              
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
            container direction="row"
            alignItems="center"
          >
            {StatusInfoCard(statusData)}
          </Box>
        </>
      </>
    )}
    </>
  );  
}
