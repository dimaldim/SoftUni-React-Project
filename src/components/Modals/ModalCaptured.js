import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';

function ModalCaptured(props)
{
  return (
    <div><Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Done!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>I've captured your emotion!</h4>
        <p>

          <Image src={props.image} thumbnail />
          I think you are {props.emotion} ! :-)
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal></div>
  );
}

export default ModalCaptured;
