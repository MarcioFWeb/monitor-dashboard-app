import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © - '}
      {new Date().getFullYear()}{' | Created by '}
      <Link color="inherit" target="_blank" href="https://pingback.com/marciodev/loop">
        Marcio Figueiredo
      </Link>{' with '}
      <Link color="inherit" target="_blank" href="https://pt-br.reactjs.org/">
        React
      </Link>{' | '}
      <Link color="inherit" target="_blank" href="https://redux.js.org/">
        Redux
      </Link>{' | '}      
      <Link color="inherit" target="_blank" href="https://mui.com/">
        Material UI
      </Link>{' | '}
      <Link color="inherit" target="_blank" href="https://recharts.org/en-US/">
        Recharts
      </Link>{'.'}
    </Typography>
  );
}