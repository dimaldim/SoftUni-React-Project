import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Button, IconButton, Toolbar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { logoutUser } from '../actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Navigation extends Component
{
  handleLogout = () =>
  {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render()
  {
    const { classes, isAuthenticated } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recognize Me :-)
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Button component={Link} to="/gallery" variant="contained" color="primary">
            Gallery
          </Button>
          {!isAuthenticated && <Button component={Link} to="/login" variant="contained" color="primary">
            Login
          </Button>}
          {!isAuthenticated &&
          <Button component={Link} to="/register" variant="contained" color="primary">
            Register
          </Button>
          }
          {isAuthenticated &&
          <Button onClick={this.handleLogout} variant="contained" color="primary">
            Logout
          </Button>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(state)
{
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Navigation));
