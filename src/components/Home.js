import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import { Button } from '@material-ui/core';
import { db, myFirebase } from '../firebase/firebase';
import uuid from 'uuid';
import axios from 'axios';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { doLoading } from '../actions';
import ModalCaptured from '../components/Modals/ModalCaptured';
import ModalCapturedError from '../components/Modals/ModalError';

class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      image: '',
      url: '',
      emotion: null,
      modalCaptured: false,
      modalCapturedError: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getEmotion = this.getEmotion.bind(this);
    this.closeModalCaptured = this.closeModalCaptured.bind(this);
    this.closeModalCapturedError = this.closeModalCapturedError.bind(this);
  }

  closeModalCapturedError()
  {
    this.setState({
      modalCapturedError: false,
    });
  }


  closeModalCaptured()
  {
    var that = this;
    that.setState({
      modalCaptured: false,
    });
  }

  handleClick(event)
  {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(doLoading(true));
    var that = this;
    const image = this.webcam.getScreenshot();
    const firebase_string = image.split('data:image/jpeg;base64,')[1];
    const image_name = `${uuid.v4()}.jpg`;
    this.setState({
      image,
    });
    const storageRef = myFirebase.storage().ref();
    const imageRef = storageRef.child(image_name);
    const uploadImg = imageRef.putString(firebase_string, 'base64');
    const userId = this.props.userInfo.uid;

    uploadImg.on('state_changed', function(snapshot)
    {
    }, function(error)
    {
      console.log(error);
    }, function()
    {
      uploadImg.snapshot.ref.getDownloadURL().then((downloadURL) =>
      {
        that.setState({
          url: downloadURL,
        });
        //Add to firebase
        that.getEmotion(downloadURL).then(emotion =>
        {
          if (typeof emotion !== 'undefined')
          {
            db.collection('gallery').add({
              image_url: that.state.url,
              user_id: userId,
              date: Date.now(),
              recognizedEmotion: emotion,
            })
              .then(docRef =>
              {
                dispatch(doLoading(false));
                that.setState({
                  emotion: emotion,
                  modalCaptured: true,
                });
              })
              .catch(error =>
              {
                console.log(error);
              });
          } else
          {
            dispatch(doLoading(false));
            that.setState({
              modalCapturedError: true,
            });
          }
        });
      });
    });
  }

  getEmotion = async (image) =>
  {
    let res = await axios({
      'method': 'POST',
      'url': 'https://luxand-cloud-face-recognition.p.rapidapi.com/photo/emotions',
      'headers': {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'luxand-cloud-face-recognition.p.rapidapi.com',
        'x-rapidapi-key': '0284580a32msh587c6b02e6b17ddp127b20jsn0a5ac3e0430a',
      }, 'params': {
        'photo': image,
      }, 'data': {},
    });
    let { data } = res;
    let emotions;
    console.log(data);
    if (data.faces.length > 0)
    {
      emotions = data.faces[0].emotions;
      return this.getKeysWithHighestValue(emotions)[0];
    }

    return;
  };

  getKeysWithHighestValue(o)
  {
    var keys = Object.keys(o);
    keys.sort(function(a, b)
    {
      return o[b] - o[a];
    });
    return keys.slice(0, 1);
  }

  render()
  {
    const videoConstraints = {
      facingMode: 'user',
    };
    return (
      <div>
        <ModalCaptured show={this.state.modalCaptured} emotion={this.state.emotion} image={this.state.image}
                       onHide={this.closeModalCaptured}/>
        <ModalCapturedError show={this.state.modalCapturedError} onHide={this.closeModalCapturedError}/>
        <Jumbotron>
          <p>
            Hello! Make your selfie with your camera and click '<em>Take a picture</em>'. I will try to recognize your
            emotioN!
            :-)</p>
        </Jumbotron>
        <Row className='justify-content-md-center'>
          <Col xs={6}>
            <Webcam
              audio={false}
              ref={node => this.webcam = node}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              height={320}
              width={320}
              className="webcam-cam"
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col xs={6}>
            <Button onClick={this.handleClick} variant="contained" color="primary">
              Take a picture! :)
            </Button>
          </Col>
        </Row>
      </div>
    )
      ;
  }
}

function mapStateToProps(state)
{
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    userInfo: state.auth.user,
  };
}

export default connect(mapStateToProps)(Home);
