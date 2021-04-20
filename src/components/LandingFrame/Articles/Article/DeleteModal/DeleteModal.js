import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class DeleteModal extends Component {
  render () {
    const { modalShow, flipModalShowState, handleDelete } = this.props
    return (
      <Modal
        show={modalShow}
        onHide={flipModalShowState}
        centered={true}
        keyboard={false}
        backdrop={'static'}
        animation={true}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Delete Article?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Deleting an article is irreversible. Please choose either Confirm or Abort.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='danger' onClick={handleDelete}>Confirm</Button>
          <Button variant='secondary' onClick={flipModalShowState}>Abort</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteModal
