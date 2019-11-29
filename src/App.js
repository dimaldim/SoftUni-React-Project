import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Content from './components/Content';

const App = () => (
  <Container className="p-3">
    <Navigation/>
    <Jumbotron>
      <Content/>
    </Jumbotron>
  </Container>
);

export default App;
