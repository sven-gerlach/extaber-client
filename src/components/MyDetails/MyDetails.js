import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import messages from '../AutoDismissAlert/messages'
import { getUserDetailFromAPI, sendUpdatedUserDetailsToAPI } from '../../api/user-details'
import camelcaseObjectDeep from 'camelcase-object-deep'

class MyDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      userImgUrl: ''
    }
  }

  componentDidMount () {
    // load current user detail from API and inject it into the form
    const token = this.props.user.token
    getUserDetailFromAPI(token)
      .then(res => {
        // convert response to camelcase
        const user = camelcaseObjectDeep(res.data.user, { deep: true })
        this.setState({
          username: user.username,
          userImgUrl: user.userImgUrl
        })
        console.log(this.state)
      })
      .catch(console.error)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateUserDetails = event => {
    event.preventDefault()
    const { msgAlert, user, updateUser } = this.props
    const token = user.token
    const updatedUserDetail = this.state

    sendUpdatedUserDetailsToAPI(token, updatedUserDetail)
      .then(res => updateUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Update Success',
        message: messages.userDetailUpdateSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Update error with error message: ' + error.message,
          message: messages.userDetailUpdateFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { username, userImgUrl } = this.state

    return (
      <DivStyled className="row mt-5">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h4 className='my-4'>My User Details</h4>
          <Form onSubmit={this.onUpdateUserDetails}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <FormControlStyled
                type="text"
                name="username"
                value={username}
                placeholder="Enter a username..."
                onChange={this.handleChange}
              />
            </Form.Group>
            <FormGroupStyled controlId="userImgUrl">
              <Form.Label>User Icon</Form.Label>
              <FormControlStyled
                name="userImgUrl"
                value={userImgUrl}
                type="url"
                placeholder="Enter url to user icon..."
                onChange={this.handleChange}
              />
              {this.state.userImgUrl ? <img src={this.state.userImgUrl} alt='user icon' /> : ''}
            </FormGroupStyled>
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

const FormGroupStyled = styled(Form.Group)`
  position: relative;
  img {
    height: calc(1.5em + 0.75rem + 2px);
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

const FormControlStyled = styled(Form.Control)`
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
    border-color: rgb(89, 78, 54);
  }
`

export const ButtonStyled = styled.button`
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

export default MyDetails
