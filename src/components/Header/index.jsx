import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { Link, NavLink } from 'react-router-dom';
import Register from './../../features/Auth/components/Register/index';
import Login from './../../features/Auth/components/Login/index';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/Auth/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1
  }
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
}

export default function Header() {
  const loggedInUser = useSelector(state => state.user.current)
  const isLoggedIn = !!loggedInUser.id
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    console.log(event);
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const classes = useStyles();

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    const action = logout
    dispatch(action)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to='/'>SHOP</Link>
          </Typography>

          <NavLink className={classes.link} to='/todos-list' activeClassName='active-menu'>
            <Button color="inherit">Todo</Button>
          </NavLink>

          <NavLink className={classes.link} to='/albums'>
            <Button color="inherit">Album</Button>
          </NavLink>

          {!isLoggedIn &&
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          }

          {isLoggedIn &&
            <IconButton onClick={handleMenuClick}>
              <AccountCircle />
            </IconButton>
          }

        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. Login here
                  </Button>
                </Box>
              </>
            )}

            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                    Done have an account. Register here
                  </Button>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}