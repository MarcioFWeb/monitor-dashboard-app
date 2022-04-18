import React from 'react';

import { Box } from '@mui/material'
import Title from '../Title/Title';

function LoadingMessages(props) {        
  
  return (
    <><Title>Aguarde</Title><Box sx={{ marginLeft: 1 }}>{props.messageText}</Box></>
  )

}

export default LoadingMessages