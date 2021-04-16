import React, { Component, Fragment } from 'react'
import { v4 as uuid } from 'uuid'
import messages from '../../AutoDismissAlert/messages'
import { sendVoteOnCommentToAPI } from '../../../api/votes'

class Comments extends Component {
  handleVote = (event, comment, vote) => {
    const {
      user,
      msgAlert,
      getLatestComments
    } = this.props
    if (!user) {
      // raise msg alerting user that only signed in users are allowed to vote
      msgAlert({
        heading: 'You are not signed-in!',
        message: messages.signInToVote,
        variant: 'info'
      })
    } else {
      const token = user.token
      const commentID = comment.id
      sendVoteOnCommentToAPI(token, commentID, vote)
        .then(getLatestComments)
        .catch(err => {
          if (err.response.status === 400) {
            msgAlert({
              heading: 'Oops!',
              message: messages.data.detail,
              variant: 'info'
            })
          } else if (err.response.status === 403) {
            msgAlert({
              heading: 'Oops!',
              message: err.response.data.detail,
              variant: 'info'
            })
          }
        })
    }
  }

  render () {
    return (
      <Fragment>
        {this.props.comments.map(comment => {
          return (
            <div key={uuid()}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p onClick={(event) => this.handleVote(event, comment, +1)}>{'\u25b2'}</p>
              <p onClick={(event) => this.handleVote(event, comment, 0)}>{comment.netVotes}</p>
              <p onClick={(event) => this.handleVote(event, comment, -1)}>{'\u25bc'}</p>
              <p>{comment.createdAt}</p>
              {/* todo: the create and update times are different by the tiniest margin */}
              {/* {comment.createdAt === comment.updatedAt ? '' : <p>{comment.updatedAt}</p>} */}
            </div>
          )
        })}
      </Fragment>
    )
  }
}

export default Comments
