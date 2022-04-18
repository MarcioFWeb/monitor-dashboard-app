import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { MenuItem, FormControl, Button, ButtonGroup, Typography, 
  Select, Grid, TextField } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { 
  RETURN_MESSAGE_OPERATION_UPDATE,
  RETURN_MESSAGE_OPERATION_INSERT,
  FORM_OPERATION_UPDATE, 
  FORM_OPERATION_INSERT, 
  USER_MESSAGES_6_SECONDS_TIMER,
  USER_ROLE_ADMINISTRATOR, 
  USER_ROLE_EMPLOYEE } from '../../ValueObjects/Enum/userFormEnum'

import {   
  USERS_REGISTER_URL, 
  USERS_UPDATE_URL,   
  textoTipoOperacao } from '../../ValueObjects/Helpers/userFormHelper'  

const UsersForm = (props) => {

  const [formData, setFormData] = useState(props.formData);

  useEffect(() => {
    if (props.formOperation === FORM_OPERATION_UPDATE) {
      setFormData(props.formData)
    } else {
      setFormData({
        role: USER_ROLE_EMPLOYEE, 
        email: "",
        password: ""
      })
    }
    
  }, [props.formData]);

  const handleFormData = (key, value) => {        
    let newData = {...formData}
    newData[key] = value
    setFormData(newData)
  }

  const handleCancel = () => {
    setFormData({})
    props.formHandle(false)
  }

  const cleanMessageAndForm = () => {
    function doActions() {
      setFormData({})      
      props.setOperationMessage('')
    }
    props.formHandle(false)
    setTimeout(doActions, USER_MESSAGES_6_SECONDS_TIMER)
  }

  const isUpdateOperation = (props.formOperation === FORM_OPERATION_UPDATE)

  const handleInsertOrUpdate = async (data, operation) => {

    if (!data.email || !data.role || (!data.password && operation === FORM_OPERATION_INSERT)) {
      props.setOperationMessage('Parametros obrigatórios não informados....')
    } else {

      let dataToSave = {...data}
  
      let messageSave = RETURN_MESSAGE_OPERATION_INSERT
      let operationService = 'register'
      if (operation === FORM_OPERATION_UPDATE) { 
        messageSave = RETURN_MESSAGE_OPERATION_UPDATE
        operationService = 'update' 
        delete dataToSave.password
      }
  
      try {
        const {response} = await axios.post(
          ((operationService === 'update') ? USERS_UPDATE_URL : USERS_REGISTER_URL),
          {...dataToSave}, {
          headers: {
            'x-access-token': props.auth.token
          }
        });
        props.setOperationMessage(messageSave);        
        props.handleRefresh();
        cleanMessageAndForm();
      } catch (error) {
        props.setOperationMessage('Erro ao incluir ou atualizar o usuário...');
        console.error(error.message);
        cleanMessageAndForm();
      }
    }
  }
  
  return (
    <Grid item xs={8} md={10} sm={12}>
      <FormControl fullWidth>        

        <Typography variant="h4" sx={{ marginLeft: 2, marginBottom: 1 }}>{textoTipoOperacao(props.formOperation)}</Typography>

        <Typography sx={{ marginLeft: 2 }}>Email</Typography>
        <TextField 
          id="Email"           
          value={formData?.email} 
          variant="outlined" 
          onChange={(e) => {handleFormData('email', e.target.value)}}
          sx={{ marginLeft: 1, marginRight: 1, marginBottom: 1 }}
        />
                
        <Typography sx={{ marginLeft: 2 }}>Nível de Acesso</Typography>
        <Select
          labelId="nivel-acesso-select-label"
          id="nivel-acesso-select"
          value={formData?.role || USER_ROLE_EMPLOYEE}          
          onChange={(e) => {handleFormData('role', e.target.value)}}
          sx={{ marginLeft: 1, marginRight: 1, marginBottom: 1 }}
        >
          <MenuItem value={USER_ROLE_EMPLOYEE}>Funcionário</MenuItem>
          <MenuItem value={USER_ROLE_ADMINISTRATOR}>Administrador</MenuItem>
        </Select>
                
        {!isUpdateOperation && <>
          <Typography sx={{ marginLeft: 2 }}>Senha</Typography>
          <TextField 
            id="password" 
            type="password"
            disabled={isUpdateOperation}
            value={isUpdateOperation ? '' : formData?.password}
            variant="outlined"
            onChange={(e) => {handleFormData('password', e.target.value)}}
            sx={{ marginLeft: 1, marginRight: 1, marginBottom: 1 }}
          />
        </>}

        <ButtonGroup 
          variant="contained" 
          aria-label="outlined primary button group"
          sx={{            
            marginTop: 1,
            padding: 1,
            alignSelf: 'center'
          }}
        >
          <Button
            onClick={() => {handleInsertOrUpdate(formData, props.formOperation)}}
            sx={{            
              marginRight: 1
            }}
            title='Salvar operação...'
          ><SaveIcon sx={{ marginRight: 1 }}/> Salvar</Button>

          <Button
            size="small" 
            onClick={() => {handleCancel()}}
            sx={{            
              marginLeft: 1
            }}
            title='Cancelar operação...'
          ><CancelIcon sx={{ marginRight: 1 }}/> Cancelar</Button>   

        </ButtonGroup>
        
      </FormControl>          
    </Grid>
  )
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(UsersForm)