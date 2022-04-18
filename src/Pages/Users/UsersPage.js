import * as React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import UsersGrid from '../../Components/UsersGrid/UsersGrid'
import { USER_ROLE_ADMINISTRATOR } from '../../ValueObjects/Enum/userFormEnum'

function UsersPage(props) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {props?.auth?.role === USER_ROLE_ADMINISTRATOR && (
          <UsersGrid />
        )}
        {props?.auth?.role !== USER_ROLE_ADMINISTRATOR && (          
          <Grid container spacing={2} sx={{ marginLeft: 1, marginTop: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5">Acesso não permitido nesta página...</Typography>
            </Grid>
            <Grid item xs={12}>
            <Link to="/" className="menu-item-link">
                Clique <strong>aqui</strong> para retornar para o <strong>Monitor Dashboard</strong>
              </Link>
            </Grid>
          </Grid>                      
        )}        
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(UsersPage)