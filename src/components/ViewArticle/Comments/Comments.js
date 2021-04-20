import React, { Component, Fragment } from 'react'
import { v4 as uuid } from 'uuid'
import messages from '../../AutoDismissAlert/messages'
import { sendVoteOnCommentToAPI } from '../../../api/votes'
import { getFormattedDateTime } from '../../../utils/utils'
import styled from 'styled-components'
import heart from '../../../assets/img/Heart.svg'
import CommentVotePanel from '../VotePanel/CommentVotePanel'
import anonymousHead from '../../../assets/img/anonymous-head.png'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCommentVotePanelDisplayed: false,
      commentID: null
    }
  }

  handleCommentVote = (event, commentIDSelected, vote) => {
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
      sendVoteOnCommentToAPI(token, commentIDSelected, vote)
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

  invertCommentVotePanel = (event, commentID) => {
    this.setState(prevState => {
      return {
        isCommentVotePanelDisplayed: !prevState.isCommentVotePanelDisplayed,
        commentID: commentID || null
      }
    })
  }

  render () {
    return (
      <Fragment>
        {this.props.comments.map(comment => {
          return (
            <div key={uuid()}>
              <AuthorDateDiv>
                {comment.authorImgUrl ? <img src={comment.authorImgUrl} alt='author image'/> : <img src={anonymousHead} alt='anonymous head'/>}
                {comment.authorUsername ? <p>{comment.authorUsername}</p> : <p>{comment.authorEmail}</p>}
                <p>{getFormattedDateTime(comment.createdAt)}</p>
              </AuthorDateDiv>
              <PStyled>{comment.body}</PStyled>
              <VoteCountDiv>
                <img
                  id='heartImg'
                  src={heart}
                  alt='heart icon'
                  data-comment-id={comment.id}
                  onClick={(event) => this.invertCommentVotePanel(event, comment.id)}/>
                <CommentVotePanel
                  invertCommentVotePanel={this.invertCommentVotePanel}
                  isCommentVotePanelDisplayed={this.state.isCommentVotePanelDisplayed}
                  handleCommentVote={this.handleCommentVote}
                  commentIDSelected={this.state.commentID}
                  commentID={comment.id}
                />
                <p>{comment.netVotes}</p>
                {/* todo: the create and update times are different by the tiniest margin */}
                {/* {comment.createdAt === comment.updatedAt ? '' : <p>{comment.updatedAt}</p>} */}
              </VoteCountDiv>
              <hr/>
            </div>
          )
        })}
      </Fragment>
    )
  }
}

const AuthorDateDiv = styled.div`
  display: flex;
  margin-top: 22px;
  align-items: center;
  img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    border-radius: 50%;
    padding: 0;
    object-fit: cover;
  }
  p {
    padding-left: 0;
    font-size: 12px;
    margin-bottom: 0;
  }
  p:first-of-type {
    font-weight: 500;
    line-height: 150%;
  }
  p:last-of-type {
    margin-left: auto;
    font-size: 0.875rem;
  }
`

const PStyled = styled.p`
  font-size: 15px;
  margin: 10px 0;
`

const VoteCountDiv = styled.div`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  position: relative;
  p {
    padding: 0;
    margin: 0 20px 0 5px;
  }
  #heartImg {
    height: 13px;
    width: 13px;
    :hover {
      cursor: pointer;
    }
  }
`

export default Comments
