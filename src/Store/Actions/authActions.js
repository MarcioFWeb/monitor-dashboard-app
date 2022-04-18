import axios from 'axios';

import { MONITOR_API_URL } from '../../ValueObjects/Enum/servicesEnum'
import { LOGIN_VERIFY, LOGOUT_USER, LOGIN_WITH_SESSION_DATA } from '../../ValueObjects/Enum/authStoreActionTypesEnum'

const setValueToLocalStorage = (key, value) => {
    try {      
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeValueFromLocalStorage = (key) => {
    try {              
        setValueToLocalStorage(key,{})
      if (typeof window !== "undefined") {        
        window.localStorage.removeItem(key);
      }
    } catch (error) {        
      console.error(error);
    }
  };

export async function doLogin(loginData) {

    const AUTH_URL = `${MONITOR_API_URL}/auth/login`
    let objRetorno = {}    
    try {

      const request = await axios.post(AUTH_URL, {...loginData});

      objRetorno = {
          role: request.data.role,
          _id: request.data._id,
          email: request.data.email,
          token: request.data.token,
          isAuth: true,
          isFailAuth: false
      }

      setValueToLocalStorage('dmsdata', objRetorno)
      
    } catch (error) {
      console.error('err' + JSON.stringify(error))
      objRetorno = {
          role: '',
          _id: '',
          email: '',
          token: '',
          isAuth: false,
          isFailAuth: true
      }

      setValueToLocalStorage('dmsdata', objRetorno)
    }

    return {
        type: LOGIN_VERIFY,
        payload: objRetorno
    }
}

export async function doLoginWithSession(objLogin) {

    setValueToLocalStorage('dmsdata', objLogin)

    return {
        type: LOGIN_WITH_SESSION_DATA,
        payload: objLogin
    }
}

export function doLogout() {

    removeValueFromLocalStorage('dmsdata')

    return {
        type: LOGOUT_USER,
        payload: {}
    }
}