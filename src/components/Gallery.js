import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { myFirebase } from '../firebase/firebase';
import { doLoading } from '../actions';
import { Card, CardGroup, Col } from 'react-bootstrap';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  div: {
    marginTop: 10,
  },
});

class Gallery extends Component
{
  constructor(props)
  {
    super(props);
    this.ref = myFirebase.firestore().collection('gallery').orderBy('date', 'desc');
    this.unsubscribe = null;
    this.state = {
      images: [],
    };
    const { dispatch } = this.props;
    dispatch(doLoading(true));
  }

  onCollectionUpdate = (querySnapshot) =>
  {
    const images = [];
    querySnapshot.forEach((doc) =>
    {
      const { image_url, user_id, date, recognizedEmotion } = doc.data();
      images.push({
        key: doc.id,
        doc, // DocumentSnapshot
        image_url,
        user_id,
        recognizedEmotion,
        date,
      });
    });
    this.setState({
      images,
    });
  };

  componentDidMount()
  {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    const { dispatch } = this.props;
    dispatch(doLoading(false));
  }

  render()
  {
    return (
      <CardGroup>
        {this.state.images.map(image =>
          <Col sm={12} xs={12} md={4} key={image.key}>
            <Card>
              <Card.Img variant="" src={image.image_url} style={{ maxWidth: '260px' }}/>
              <Card.Body>
                <Card.Title>Hi! I'm {image.recognizedEmotion}.</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam architecto asperiores, delectus
                  doloremque dolorum facilis fugit ipsa obcaecati praesentium quas quis quisquam sint, vel veritatis
                  voluptatem voluptatibus. Eligendi, officiis.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <em>Date: </em>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  }).format(image.date)}
                </small>
              </Card.Footer>
            </Card>
          </Col>,
        )}
      </CardGroup>
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

export default withStyles(styles)(connect(mapStateToProps)(Gallery));
