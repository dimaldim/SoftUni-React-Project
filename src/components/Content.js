import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Gallery from './Gallery';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/gallery' component={Gallery}/>
    </Switch>
  </main>
);

export default Main;
