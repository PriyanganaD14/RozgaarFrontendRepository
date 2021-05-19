import React, { Component, useEffect } from 'react';
import './Navbar.css'
import { Button, NavbarBrand } from "reactstrap"
import logo from "../Assets/favicon.ico"
import { Link,useHistory, useLocation } from "react-router-dom"


import { useState } from "react";
import {useDispatch} from 'react-redux';

//signin and signup
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar, Card, Grid, Toolbar, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';


import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ResetPassword from '../auth/ResetPassword';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

}));



const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
    setState(false);
  };


  const classes = useStyles();
  
  //showing the user 
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch(); 
  const history = useHistory(); 
  const location = useLocation();

  //console.log(user); 
  const logout = () => {
    dispatch({ type: 'LOGOUT'});

    history.push('/');

    setUser(null);
  };

  useEffect(() => {
  
     const token = user?.token;

     //JWT.... 

     setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);


  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [state,setState]=useState(false);
  const [isForgetClicked, setIsForgetClicked] = useState(false); 
  
  //functions for implementing cancel icon
  const handleOpen = () => {
    setOpen(true);
    setAnchorEl(null);
    setState(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setIsForgetClicked(false);
  };


  const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);
  // state = { clicked: false }

  const handleClick = () => {
    setState(!state)
  }


    return (
      <>
        <nav className="NavbarItems">
          <h1 className="navbar-logo">
            <NavbarBrand className="fav" href="/">
              <a href="/">
                <img
                  src={logo}
                  alt="logoImg"
                  style={{ height: 30, width: 30 }}
                  className="mr-2 d-inline-block align-top"
                ></img>
              </a>
              <i>
                <b>Rozgaar</b>
              </i>
            </NavbarBrand>
          </h1>
          <div className="menu-icon" onClick={handleClick}>
            <i className={state ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div> 
          
          {user?.result ? (
               <ul className={state ? 'nav-menu active' : 'nav-menu classes.profile'}>
               <li><Link onClick={handleClose2} className="nav-links" to="/Profile">Profile</Link></li>
               <li><Link onClick={handleClose2} className="nav-links" to="/Dashboard">Dashboard</Link></li>
               <li><Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar></li>
               <li><Typography className="nav-links" color="textPrimary">{user.result.name}</Typography></li>
               <li><Link onClick={handleClose2} className="nav-links" onClick={logout}>Logout</Link></li>
               </ul>
           ) : (
             //<Button component={Link} to="/auth" varient="contained" color="primary" onClick={handleOpen}>Sign In</Button>
             <ul className={state ? 'nav-menu active' : 'nav-menu'}>
               
             <li><Link onClick={handleClose2} className="nav-links" to="/Profile">Profile</Link></li>
             <li><Link onClick={handleClose2} className="nav-links" to="/Dashboard">Dashboard</Link></li>
             <li><Link className="nav-links" onClick={handleOpen}>Signin</Link></li> 
             </ul>
           )}
        </nav>  
        <div style={{ marginBottom: 100 }}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Card>
                <Grid container justify="flex-end" >
                  <Grid ><Button color="white" style={{ margin: "0px", padding: "0px" }} onClick={handleClose}><CancelIcon /></Button></Grid>
                </Grid>
                <SignIn
                  setOpen={setOpen}
                  setOpen1={setOpen1} //from signin -> signup button
                  setIsForgetClicked={setIsForgetClicked}
                />
              </Card>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open1}
            onClose={handleClose1}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open1}>

              <Card>
                <Grid container justify="flex-end" >
                  <Grid ><Button color="white" style={{ margin: "0px", padding: "0px" }} onClick={handleClose1}><CancelIcon /></Button></Grid>
                </Grid>
                <SignUp
                  setOpen={setOpen}
                 setOpen1={setOpen1} //from signup -> sigin 
                />
              </Card>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isForgetClicked}
            onClose={handleClose1}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={isForgetClicked}>
              <Card>
                <Grid container justify="flex-end" >
                  <Grid ><Button color="white" style={{ margin: "0px", padding: "0px" }} onClick={handleClose1}><CancelIcon /></Button></Grid>
                </Grid>
                <ResetPassword setIsForgetClicked={setIsForgetClicked}/>
              </Card>
            </Fade>
          </Modal>
        </div>
      </>
    )

}

export default Navbar