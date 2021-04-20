import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class EasySignInModal extends Component {
  render () {
    const { isModal, user, handleExpeditedSignUp, handleCloseModal } = this.props
    if (isModal && !user) {
      return (
        <Modal
          show={isModal}
          onHide={handleCloseModal}
          centered={true}
          keyboard={false}
          backdrop={'static'}
          animation={true}
        >
          <Modal.Header closeButton={false}>
            <Modal.Title>In a Hurry?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{'Please click on the "Expedited Sign-In" button if you don\'t want to create your own account and do not care for user data persistence across sessions.'}</p>
            <p>{'Otherwise, please close this dialog and sign-up / sign-in instead.'}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleExpeditedSignUp}>Expedited Sign-In</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return null
  }
}

export default EasySignInModal
