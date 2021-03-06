import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions';
import { withStyles } from '@material-ui/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core';

const styles = () => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  paper: {
    marginTop: 100,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f50057',
  },
  form: {
    marginTop: 1,
  },
  errorText: {
    color: '#f50057',
    marginBottom: 5,
    textAlign: 'center',
  },
});

class Login extends Component
{
  state = { email: '', password: '' };

  handleEmailChange = ({ target }) =>
  {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) =>
  {
    this.setState({ password: target.value });
  };

  handleSubmit = () =>
  {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render()
  {
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated)
    {
      return <Redirect to="/"/>;
    } else
    {
      return (
        <div>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Welcome
            </Typography>
            <Typography component="p">
              Please Log In in order to play! If you don't have registration, you can register from the button in the
              navigation bar.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </Paper>
        </div>
      );
    }
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

export default withStyles(styles)(connect(mapStateToProps)(Login));
