import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getArticleFromAPI } from '../../api/articles'
import { getCommentsFromAPI } from '../../api/comments'
import { sendVoteOnArticleToAPI } from '../../api/votes'
import camelcaseObjectDeep from 'camelcase-object-deep'
import Spinner from 'react-bootstrap/Spinner'
import CommentInput from './Comments/CommentInput'
import Comments from './Comments/Comments'
import messages from '../AutoDismissAlert/messages'

class ViewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      comments: []
    }
  }

  componentDidMount () {
    this.getLatestArticleData()
    this.getLatestComments()
  }

  getLatestArticleData = () => {
    // make axios call to retrieve the article's details
    const articleID = this.props.match.params.id
    getArticleFromAPI(articleID)
      .then(res => {
        // convert obj from snake- to camel-case
        const article = camelcaseObjectDeep(res.data.article, { deep: true })
        this.setState({ article })
      })
      .catch(console.error)
  }

  getLatestComments = () => {
    // make axios call to api to retrieve all comments for this article
    // and store comments array in state
    const articleID = this.props.match.params.id
    getCommentsFromAPI(articleID)
      .then(res => {
        const comments = camelcaseObjectDeep(res.data.comments, { deep: true })
        this.setState({ comments })
      })
      .catch(console.error)
  }

  handleVote = (event, vote) => {
    const { user, msgAlert } = this.props
    if (!user) {
      // raise msg alerting user that only signed in users are allowed to vote
      msgAlert({
        heading: 'You are not signed-in!',
        message: messages.signInToVote,
        variant: 'info'
      })
    } else {
      const token = user.token
      const articleID = this.state.article.id
      sendVoteOnArticleToAPI(token, articleID, vote)
        .then(res => {
          console.log(res)
          this.getLatestArticleData()
          this.getLatestComments()
        })
        .catch(err => {
          if (err.response.status === 400) {
            msgAlert({
              heading: 'Oops!',
              message: messages.alreadyVoted,
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
    if (!this.state.article) {
      return (
        <Container className='mt-3'>
          <Col>
            <Row>
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </Row>
          </Col>
        </Container>
      )
    }
    const { title, subTitle, author, imgUrl, body, createdAt, updatedAt, netVotes } = this.state.article
    const { msgAlert, user } = this.props
    return (
      <Container className='mt-3'>
        <Col>
          <Row>
            <h4>{title}</h4>
            {subTitle === '' ? '' : <h6>{subTitle}</h6>}
            <p>{author}</p>
            {imgUrl === '' ? '' : <img src={imgUrl} alt='Image associated with article' />}
            <p>{createdAt}</p>
            {updatedAt !== createdAt ? <p>{updatedAt}</p> : ''}
            <p onClick={(event) => this.handleVote(event, +1)}>{'\u25b2'}</p>
            <p onClick={(event) => this.handleVote(event, 0)}>{netVotes}</p>
            <p onClick={(event) => this.handleVote(event, -1)}>{'\u25bc'}</p>
            <p>{body}</p>
            <CommentInput
              msgAlert={msgAlert}
              user={user}
              getLatestArticleData={this.getLatestArticleData}
            />
            <Comments
              msgAlert={msgAlert}
              user={user}
              comments={this.state.comments}
              getLatestComments={this.getLatestComments}
            />
          </Row>
        </Col>
      </Container>
    )
  }
}

export default withRouter(ViewArticle)
