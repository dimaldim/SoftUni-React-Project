import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Home = function()
{
  return (
      <Card>
        <Card.Header>Welcome</Card.Header>
        <Card.Body>
          <Card.Title>Welcome, guest!</Card.Title>
          <Card.Text>
            In order to play the game, you must be a registered user! You can register from <Link
            to='/register'>here</Link>.
          </Card.Text>
        </Card.Body>
      </Card>
  );
};

export default Home;
