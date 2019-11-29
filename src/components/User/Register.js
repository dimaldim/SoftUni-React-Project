import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions';
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

    dispatch(registerUser(email, password));
  };

  render()
  {
    const { classes, registration, isAuthenticated } = this.props;
    if (isAuthenticated)
    {
      return <Redirect to="/"/>;
    } else
    {
      return (
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration form
          </Typography>
          {registration.message && (
            <Typography component="p" className={classes.errorText}>
              {registration.message}
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
            Register
          </Button>
        </Paper>
      );
    }
  }
}

function mapStateToProps(state)
{
  return {
    isLoggingIn: state.auth.isLoggingIn,
    registration: state.auth.registration,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
