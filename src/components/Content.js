import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Gallery from './Gallery';
import NotFound from './NotFound';
import Login from './User/Login';
import Register from './User/Register';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/gallery' component={Gallery}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='*' exact={true} component={NotFound}/>
    </Switch>
  </main>
);

export default Main;
