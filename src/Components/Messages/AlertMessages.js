import React from 'react';

import { Alert } from '@mui/material'

function AlertMessages(props) {      
  
  const showAlertMessageVisible = (props.message && typeof props.message === 'string' && props.message.trim() !== '')
  
  return (
    <>{showAlertMessageVisible && <Alert severity={props.type}>{props.message}</Alert>}</>
  )

}

export default AlertMessages