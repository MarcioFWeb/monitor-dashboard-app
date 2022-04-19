import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

import { doLogout } from '../../Store/Actions/authActions';

import '../MenuItems/MenuItems.css'

function MainListItems(props) {

  const handleLogout = () => {  
    props.doUserLogout();
  };

  const defaultLink = (linkURL, linkText) => {
    return (<>
      <Link to={linkURL} className="menu-item-link">
        <ListItemButton>
          <ListItemIcon>
          {linkText !== "Usuários" && (<DashboardIcon />)}
          {linkText === "Usuários" && (<PeopleIcon />)}
          </ListItemIcon>
          <ListItemText primary={linkText} />
        </ListItemButton>
      </Link>
    </>)
  }
  
  return (
    <>
      {defaultLink("/", "Monitor Dashboard")}
      
      {props?.auth?.role === 'administrador' && (defaultLink("/users", "Usuários"))}

      <ListItemButton
        onClick={handleLogout}        
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText className="menu-item-link" primary="Sair" />
      </ListItemButton>    
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
    doUserLogout() {
      const action = doLogout()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainListItems)