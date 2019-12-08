import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions';
import { Alert, Button, Form } from 'react-bootstrap';

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
    const { registration, isAuthenticated } = this.props;
    if (isAuthenticated)
    {
      return <Redirect to="/"/>;
    } else
    {
      return (
        <div>
          {registration.message &&
          (
            <Alert variant="danger">{registration.message}</Alert>
          )
          }
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" onChange={this.handleEmailChange} placeholder="Enter email"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={this.handlePasswordChange}
                            placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" onClick={this.handleSubmit} type="submit">
              Register
            </Button>
        </div>
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

export default connect(mapStateToProps)(Login);
