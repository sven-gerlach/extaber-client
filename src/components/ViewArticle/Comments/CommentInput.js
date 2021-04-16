import React, { Component, Fragment } from 'react'
import { sendCommentToAPI } from '../../../api/comments'
import messages from '../../AutoDismissAlert/messages'
import { withRouter } from 'react-router-dom'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: ''
    }
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
        <form onSubmit={this.handleSubmit}>
          <input
            type='textarea'
            name='comment'
            value={comment}
            placeholder='[comment]'
            required={true}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(CommentInput)
