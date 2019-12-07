import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/protectedRoute';
import Home from './components/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Navigation from './components/TopBar';
import Gallery from './components/Gallery';
import { Container } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';

const styles = {
  container: {
    height: '100%',
  },
};

function App(props)
{
  const { isAuthenticated, isVerifying, isLoading } = props;
  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text='Loading'
    >
      <Navigation/>
      <Container style={styles.container}>
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
    </LoadingOverlay>
  );
}

function mapStateToProps(state)
{
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    isLoading: state.auth.isLoading,
  };
}

export default connect(mapStateToProps)(App);
