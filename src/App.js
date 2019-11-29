import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Content from './components/Content';

const App = () => (
  <Container className="p-3">
    <Navigation/>
    <Content/>
  </Container>
);

export default App;
