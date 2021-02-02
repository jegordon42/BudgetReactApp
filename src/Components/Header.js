import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings';

function Header(props) {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        {props.user != null && (
          <div>
            {/* <img
              alt=""
              //src="money-logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{display:'inline'}}
              /> */}
              {props.user['firstName'] + "'s Money" }
          </div>
          )
        }
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {props.page==="dashboard" && (
          <div>
            <Button variant="secondary" onClick={() => {props.setShowSettings(true);}} style={{marginRight:5}}><SettingsIcon/> Settings</Button>
            <Button variant="secondary" onClick={() => {props.setUser(null); props.setPage("login")}}><ExitToAppIcon/> Logout</Button>
          </div>
        )}   
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;