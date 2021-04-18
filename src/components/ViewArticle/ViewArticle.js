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
import anonymousHead from '../../assets/img/anonymous-head.png'
import ArticleVotePanel from './VotePanel/ArticleVotePanel'

class ViewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      comments: [],
      isArticleVotePanelDisplayed: false
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
        console.log(article)
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

  handleArticleVote = (event, vote) => {
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

  invertArticleVotePanel = () => {
    this.setState(prevState => {
      return {
        isArticleVotePanelDisplayed: !prevState.isArticleVotePanelDisplayed
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

    const {
      title,
      subTitle,
      authorEmail,
      authorImgUrl,
      authorUsername,
      imgUrl,
      commentCount,
      body,
      createdAt,
      updatedAt,
      netVotes
    } = this.state.article
    const { msgAlert, user } = this.props
    console.log(authorUsername)
    console.log(authorEmail)
    console.log(authorImgUrl)
    return (
      <ContainerStyled>
        <Col>
          <Row>
            <h4 className='title'>{title}</h4>
            {subTitle === '' ? '' : <h6 className='sub-title'>{subTitle}</h6>}
            <AuthorDiv>
              {authorImgUrl ? <img src={authorImgUrl}/> : <img src={anonymousHead}/>}
              {authorUsername ? <p>{authorUsername}</p> : <p>{authorEmail}</p>}
            </AuthorDiv>
            <div className='vote-comment-time'>
              <p>{getFormattedDateTime(createdAt)}</p>
              {updatedAt !== createdAt ? <p>Updated: {getFormattedDateTime(updatedAt)}</p> : ''}
              <img src={heart} alt='heart icon' onClick={this.invertArticleVotePanel} />
              <ArticleVotePanel
                invertArticleVotePanel={this.invertArticleVotePanel}
                isArticleVotePanelDisplayed={this.state.isArticleVotePanelDisplayed}
                handleArticleVote={this.handleArticleVote}
              />
              <p>{netVotes}</p>
              <img src={speechBubble} alt='speech bubble icon' />
              <p>{commentCount}</p>
            </div>
            {imgUrl === '' ? '' : <img src={imgUrl} alt='Image associated with article' />}
            <p>{body}</p>
            <hr/>
            <CommentInput
              msgAlert={msgAlert}
              user={user}
              getLatestArticleData={this.getLatestArticleData}
              getLatestComments={this.getLatestComments}
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
  padding: 0;
  
  .row {
    display: flex;
    flex-direction: column;
    >*:not(hr) {
      padding: 0 15px 0 15px;
    }
    hr {
      width: 100%;
      height: 1px;
    }
  }
  
  .title {
    font-size: 1.625rem;
    font-weight: bold;
  }
  
  .sub-title {
    font-size: 19px;
    color: rgb(102, 92, 88);
  }
  
  //.author {
  //  margin: 15px 0 0;
  //  font-size: 14px;
  //}
  
  .vote-comment-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    
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
    
    img:first-of-type:hover {
      cursor: pointer;
    }
  }
  
  img {
    width: 100%;
    padding: 0;
    margin: 15px 0;
  }
`

const AuthorDiv = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 40px;
    margin-right: 20px;
    border-radius: 50%;
  }
  
  p {
    margin: 0
  }
`

export default withRouter(ViewArticle)
