import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CHART_URL_CPU, chartDataDecorator } from '../../ValueObjects/Helpers/chartDataHelper';
import LoadingMessages from '../Messages/LoadingMessages';
import ChartDefaultContent from '../Chart/ChartDefaultContent';

export default function ChartCPUUsage() {

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);  

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get(CHART_URL_CPU);
        setChartData(chartDataDecorator(response));
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);    

  return (
    <>
    {loading && <LoadingMessages textMessage={'Aguarde, carregando dados...'} />}
    {!loading && (
      <>
        <ChartDefaultContent title={'CPU Usage'} chartData={chartData}/>        
      </>
    )}
    </>
  );  
}
