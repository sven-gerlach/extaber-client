import React, { Component, Fragment } from 'react'
import { sendCommentToAPI } from '../../../api/comments'
import messages from '../../AutoDismissAlert/messages'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonStyled } from '../../SignIn/SignIn'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.textAreaRef = React.createRef()
  }

  componentDidMount () {
    this.textAreaChange(this.textAreaRef.current)
  }

  textAreaChange (text) {
    text.style.height = 'auto'
    text.style.height = text.scrollHeight + 'px'
  }

  handleChange = event => this.setState({ comment: event.target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props

    if (!user) {
      // alert user that only signed-in users can comment on articles
      msgAlert({
        heading: 'You are not signed-in!',
        message: messages.signInToComment,
        variant: 'info'
      })
    } else {
      const token = this.props.user.token
      const articleID = this.props.match.params.id
      const comment = this.state.comment
      sendCommentToAPI(token, articleID, comment)
        .then(res => {
          this.props.getLatestArticleData()
        })
        .catch(console.error)
    }
  }

  render () {
    const { comment } = this.state

    return (
      <Fragment>
        <FormStyled onSubmit={this.handleSubmit}>
          <InputStyled
            ref={this.textAreaRef}
            name='comment'
            value={comment}
            placeholder='Write a comment...'
            required={true}
            onChange={(event) => {
              this.handleChange(event)
              this.textAreaChange(event.target)
            }}
          />
          <ButtonStyled type='submit'>Submit</ButtonStyled>
        </FormStyled>
      </Fragment>
    )
  }
}

const InputStyled = styled.textarea`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
    border-color: rgb(89, 78, 54);
  }
`

const FormStyled = styled.form`
  > * {
    display: block;
    margin-bottom: 10px;
  }
`

export default withRouter(CommentInput)
