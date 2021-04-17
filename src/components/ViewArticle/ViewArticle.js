import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getArticleFromAPI } from '../../api/articles'
import { getCommentsFromAPI } from '../../api/comments'
import { sendVoteOnArticleToAPI } from '../../api/votes'
import camelcaseObjectDeep from 'camelcase-object-deep'
import { getFormattedDateTime } from '../../utils/utils'
import Spinner from 'react-bootstrap/Spinner'
import CommentInput from './Comments/CommentInput'
import Comments from './Comments/Comments'
import messages from '../AutoDismissAlert/messages'
import styled from 'styled-components'
import speechBubble from '../../assets/img/Speech_bubble.png'
import heart from '../../assets/img/Heart.svg'
import VotePanel from './VotePanel/VotePanel'

class ViewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      comments: [],
      isVotePanelDisplayed: false
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

  invertVotePanel = () => {
    this.setState(prevState => {
      return {
        isVotePanelDisplayed: !prevState.isVotePanelDisplayed
      }
    })
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

    const { title, subTitle, author, imgUrl, commentCount, body, createdAt, updatedAt, netVotes } = this.state.article
    const { msgAlert, user } = this.props
    return (
      <ContainerStyled>
        <Col>
          <Row>
            <h4 className='title'>{title}</h4>
            {subTitle === '' ? '' : <h6 className='sub-title'>{subTitle}</h6>}
            <p className='author'>{author}</p>
            <div className='vote-comment-time'>
              <p>{getFormattedDateTime(createdAt)}</p>
              {updatedAt !== createdAt ? <p>Updated: {getFormattedDateTime(updatedAt)}</p> : ''}
              <img src={heart} alt='heart icon' onClick={this.invertVotePanel} />
              <VotePanel
                invertVotePanel={this.invertVotePanel}
                isVotePanelDisplayed={this.state.isVotePanelDisplayed}
                handleVote={this.handleVote}
              />
              <p>{netVotes}</p>
              <img src={speechBubble} alt='speech bubble icon' />
              <p>{commentCount}</p>
            </div>
            {imgUrl === '' ? '' : <img src={imgUrl} alt='Image associated with article' />}
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
      </ContainerStyled>
    )
  }
}

const ContainerStyled = styled(Container)`
  margin-top: 90px;
  
  .row {
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: 1.625rem;
    font-weight: bold;
  }
  
  .sub-title {
    font-size: 19px;
    color: rgb(102, 92, 88);
  }
  
  .author {
    margin: 15px 0 0;
  }
  
  .vote-comment-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    >p {
      font-size: 14px;
      color: rgb(102, 92, 88);
      margin: 0 15px 0 0;
    }
    
    img {
      height: 13px;
      width: 13px;
      margin-right: 4px;
    }
    
    img:hover {
      fill: red;
    }
  }
  
  img {
    width: 100%;
    padding: 0;
  }
`

export default withRouter(ViewArticle)
