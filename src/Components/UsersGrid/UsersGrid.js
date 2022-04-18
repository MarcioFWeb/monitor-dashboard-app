import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { Button, Box, Grid } from '@mui/material'

import AddCircleIcon from '@mui/icons-material/AddCircle';

import UsersForm from '../UsersForm/UsersForm';
import AlertMessages from '../Messages/AlertMessages'

import Title from '../Title/Title';
import UsersGridTable from './UsersGridTable';

import { USER_MESSAGES_6_SECONDS_TIMER, FORM_OPERATION_INSERT } from '../../ValueObjects/Enum/userFormEnum'
import { USERS_DELETE_URL, USERS_GETALL_URL } from '../../ValueObjects/Helpers/userFormHelper'

function UsersGrid(props) {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [formOperation, setFormOperation] = useState('');
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [operationMessage, setOperationMessage] = useState('');

  const cleanMessageAndForm = () => {

    function doActions() {
      setFormData({})      
      setOperationMessage('')
    }
    formHandle(false)
    setTimeout(doActions, USER_MESSAGES_6_SECONDS_TIMER)
    
  }

  const formHandle = (state, operation) => {
    setShowForm(state)
    setFormOperation(operation)
  }

  const formDataHandle = (row) => {
    formHandle(true, 'update')
    setFormData(row)    
  }

  const handleDelete = async (_id) => {    

    try {
      const {response} = await axios.delete(USERS_DELETE_URL, {
        headers: {
          'x-access-token': props.auth.token
        },
        data: {
          _id
        }
      });
      setOperationMessage('O usuário foi excluído com sucesso...');
      handleRefresh()
      cleanMessageAndForm()
    } catch (error) {
      setOperationMessage('Não foi possível excluir o usuário...');
      console.error(error.message);
      cleanMessageAndForm()
    }

  }

  const handleRefresh = () => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get(USERS_GETALL_URL, {
          headers: {
            'x-access-token': props.auth.token
          }
        });                
        setUsersData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }

  useEffect(() => {
    handleRefresh();
  }, []);      

  return (
    <Grid
      container spacing={2}
      sx={{ marginLeft: 1, marginTop: 2}}
    >
      
      <Title>Usuários - Administração</Title>

      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>        
          <Button 
            size="small" 
            variant="contained"
            onClick={() => {formHandle(true, FORM_OPERATION_INSERT)}}
            title='Inlcuir um novo usuário...'
          ><AddCircleIcon sx={{ marginRight: 1 }} /> Incluir Usuário</Button>        
        </Grid>

        <AlertMessages 
          message={operationMessage}
          type="success"
        />

        {showForm && (
          <UsersForm 
            formHandle={formHandle} 
            formData={formData} 
            formOperation={formOperation} 
            handleRefresh={handleRefresh} 
            setOperationMessage={setOperationMessage}
          />
        )}

        {loading && <><Box sx={{ margin: 3 }}>Aguarde, carregando dados...</Box></>}
        {!loading && (
          <Grid item xs={12} md={12} sm={12}>
            <UsersGridTable usersData={usersData} formDataHandle={formDataHandle} handleDelete={handleDelete} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(UsersGrid)