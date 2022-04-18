import { MONITOR_API_URL } from '../Enum/servicesEnum';
import {   
  TITLE_FORM_OPERATION_UPDATE, 
  TITLE_FORM_OPERATION_INSERT } from '../../ValueObjects/Enum/userFormEnum';

export const USERS_GETALL_URL = `${MONITOR_API_URL}/user`;
export const USERS_REGISTER_URL = `${MONITOR_API_URL}/user/register`;
export const USERS_UPDATE_URL = `${MONITOR_API_URL}/user/update`;
export const USERS_DELETE_URL = `${MONITOR_API_URL}/user/delete`;

export const textoTipoOperacao = (operacao) => {

  switch (operacao) {
    case 'insert':
      return TITLE_FORM_OPERATION_UPDATE
    case 'update':
      return TITLE_FORM_OPERATION_INSERT
    default:
      break;
  }

}  