import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <DivStyled className="row mt-5">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <H4Styled>Change Password</H4Styled>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old password</Form.Label>
              <FormControlStyled
                required
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="Old Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <FormControlStyled
                required
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <ButtonStyled
              type="submit"
            >
              Submit
            </ButtonStyled>
          </Form>
        </div>
      </DivStyled>
    )
  }
}

const DivStyled = styled.div`
  padding: 0 10px;
`

const H4Styled = styled.h4`
  margin-bottom: 24px;
`

const FormControlStyled = styled(Form.Control)`
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
    border-color: rgb(89, 78, 54);
  }
`

const ButtonStyled = styled.button`
  background-color: rgb(126, 132, 107);
  color: white;
  border: none;
  border-radius: 0.25rem;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  :active {
    background-color: rgb(89, 78, 54);
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
  }
`

export default withRouter(ChangePassword)
