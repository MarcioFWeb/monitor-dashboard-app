import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { 
  TableBody, Button, ButtonGroup, Chip, 
  Table, TableCell, TableHead, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { USER_ROLE_EMPLOYEE } from '../../ValueObjects/Enum/userFormEnum'

function UsersGridTable(props) {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const theme = useTheme();
  const isMediumOrBiggerScreens = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {    
    setIsSmallScreen(!isMediumOrBiggerScreens);    
  }, [isMediumOrBiggerScreens]);

  const showRoleType = (label) => {
    return (
      <Chip label={label} variant="outlined" color={label === USER_ROLE_EMPLOYEE ? 'primary' : 'secondary'} size="small" />      
    )
  }

  return (

    <Table size="small">

      {isSmallScreen && (<>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Nível de Acesso</TableCell>
        </TableRow>
        <TableRow>                  
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>        
        {props.usersData.map((row) => (
          <>
          <TableRow key={row.email}>
            <TableCell>{row.email}</TableCell>
            <TableCell>{showRoleType(row.role)}</TableCell>                   
          </TableRow>
          <TableRow key={row._id}>
            <TableCell>
              <ButtonGroup 
                size="small" 
                variant="contained" 
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {props.formDataHandle(row)}}
                  title='Editar dados do usuário...'
                  sx={{ marginRight: 1 }}
                ><EditIcon /></Button>
                <Button
                  onClick={() => {props.handleDelete(row._id)}}
                  color="error"
                  title='Excluir usuário...'
                ><DeleteIcon /></Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        </>
        ))}
      </TableBody></>)}

      {!isSmallScreen && (<>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Nível de Acesso</TableCell>                
          <TableCell align='right'>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>        
        {props.usersData.map((row) => (
          <>
          <TableRow key={row._id}>
            <TableCell>{row.email}</TableCell>
            <TableCell>{showRoleType(row.role)}</TableCell>                   
            <TableCell align='right'>
              <ButtonGroup 
                size="small" 
                variant="contained" 
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {props.formDataHandle(row)}}
                  title='Editar dados do usuário...'
                  sx={{ marginRight: 1 }}
                ><EditIcon /></Button>
                <Button
                  onClick={() => {props.handleDelete(row._id)}}
                  color="error"
                  title='Excluir usuário...'
                ><DeleteIcon /></Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        </>
        ))}
      </TableBody></>)}

    </Table>
  );
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(UsersGridTable)