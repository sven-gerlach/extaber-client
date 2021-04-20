import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { ButtonStyled } from '../SignIn/SignIn'
import styled from 'styled-components'

class SignUp extends Component {
  render () {
    const { email, password, passwordConfirmation, handleChange } = this.props

    return (
      <DivStyled className="row mt-5">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h4 className='my-4'>Sign Up</h4>
          <Form onSubmit={this.props.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <FormControlStyled
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <FormControlStyled
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <FormControlStyled
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </Form.Group>
            <ButtonStyled
              variant="primary"
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

const FormControlStyled = styled(Form.Control)`
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
    border-color: rgb(89, 78, 54);
  }
`

export default withRouter(SignUp)
