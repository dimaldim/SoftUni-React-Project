import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { doLoading, logoutUser } from '../actions';

class TopBar extends Component
{
  constructor(props)
  {
    super(props);
    const { dispatch } = this.props;
    dispatch(doLoading(true));
  }

  handleLogout = () =>
  {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  componentDidMount()
  {
    const { dispatch } = this.props;
    dispatch(doLoading(false));
  }

  render()
  {
    const { isAuthenticated } = this.props;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Emotions</Navbar.Brand>
        <Nav className="mr-auto">
          {isAuthenticated ?
            (
              [
                <Nav.Link as={Link} to="/">Home</Nav.Link>,
                <Nav.Link as={Link} to='/gallery'>Gallery</Nav.Link>,
                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>,
              ]
            )
            :
            (
              [
                <Nav.Link as={Link} to='/gallery'>Gallery</Nav.Link>,
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>,
                <Nav.Link as={Link} to='/register'>Register</Nav.Link>,
              ]
            )
          }
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state)
{
  return {
    userInfo: state.auth.user,
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(TopBar);
