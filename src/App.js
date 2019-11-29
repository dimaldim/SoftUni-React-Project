import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './components/protectedRoute';
import Home from './components/Home';
import Login from './components/User/Login';
import { Container, CircularProgress } from '@material-ui/core';
import Register from './components/User/Register';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';

function App(props)
{
  const { isAuthenticated, isVerifying } = props;
  return (
    <div>
      <Navigation/>
      <Container maxWidth="sm">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/gallery"
            component={Gallery}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </Container>
    </div>
  );
}

function mapStateToProps(state)
{
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(App);
