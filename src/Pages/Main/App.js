import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import MainContent from '../MainContent'
import LoginPage from '../Login/LoginPage'
import useLocalStorage from '../../ValueObjects/Helpers/useLocalStorageHookHelper'
import { doLoginWithSession } from '../../Store/Actions/authActions'

function App(props) {
  
  const [sessionData, setSessionData] = useLocalStorage("dmsdata", {});

  useEffect(() => {
    
    if (sessionData?.isAuth) {
      if (!props.auth.isAuth) {
        props.doLoginWithSessionData({...sessionData})
        setSessionData({})
      }      
    }
  }, [props]);    

  return (
    <>
      {props?.auth?.isAuth && (<MainContent />)}
      {(!props?.auth || !props?.auth?.isAuth) && (<LoginPage />)}
    </>    
  );
}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doLoginWithSessionData(loginSessionData) {
      const action = doLoginWithSession(loginSessionData)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)