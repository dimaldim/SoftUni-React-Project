import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalCapturedError(props)
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
          Sorry!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>There's a problem!</h4>
        <p>
          It seems there's no face in the picture or I can't detect any emotions. Please try again.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal></div>
  );
}

export default ModalCapturedError;
