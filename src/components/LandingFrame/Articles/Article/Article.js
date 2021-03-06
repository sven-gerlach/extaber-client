import React, { Component, Fragment } from 'react'
import { deleteMyArticleFromAPI } from '../../../../api/articles'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getFormattedDateTime } from '../../../../utils/utils'
import heart from '../../../../assets/img/Heart.svg'
import speechBubble from '../../../../assets/img/Speech_bubble.png'
import anonymousHead from '../../../../assets/img/anonymous-head.png'
import marked from 'marked'
import DOMPurify from 'dompurify'
import DeleteModal from './DeleteModal/DeleteModal'

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalShow: false
    }
  }

  handleSelectArticle = event => {
    event.preventDefault()
    event.stopPropagation()
    // redirect to view article in full
    const articleID = this.props.article.id
    this.props.history.push(`/view-article/${articleID}`)
  }

  handleDelete = event => {
    event.preventDefault()
    event.stopPropagation()
    const token = this.props.user.token
    const articleID = this.props.article.id
    deleteMyArticleFromAPI(token, articleID)
      .then(this.props.updateMyArticles)
      .catch(console.error)
  }

  handleUpdate = event => {
    event.preventDefault()
    event.stopPropagation()
    // redirect to article specific route for updating
    const articleID = this.props.article.id
    this.props.history.push(`/update-article/${articleID}`)
  }

  createCleanedMarkup = (body) => {
    const dirtyHTML = marked(body)
    const cleanHTML = DOMPurify.sanitize(dirtyHTML)
    return { __html: cleanHTML }
  }

  flipModalShowState = (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  render () {
    // todo: implement comments here
    const {
      imgUrl,
      title,
      subTitle,
      createdAt,
      authorEmail,
      authorUsername,
      authorImgUrl,
      netVotes,
      commentCount
    } = this.props.article

    const buttonJSX = (
      <ButtonContainer>
        <ButtonStyled type='button' onClick={this.flipModalShowState}>Delete</ButtonStyled>
        <ButtonStyled type='button' onClick={this.handleUpdate}>Update</ButtonStyled>
      </ButtonContainer>
    )

    return (
      <Fragment>
        <Div onClick={this.handleSelectArticle}>
          <AuthorDateDiv>
            {authorImgUrl ? <img src={authorImgUrl}/> : <img src={anonymousHead}/>}
            {authorUsername ? <p>{authorUsername}</p> : <p>{authorEmail}</p>}
            <p>{getFormattedDateTime(createdAt)}</p>
          </AuthorDateDiv>
          <h4>{title}</h4>
          {subTitle ? <p>{subTitle}</p> : ''}
          {imgUrl ? <div><img className='articleImg' src={imgUrl} /></div> : '' }
          <VoteCommentCountDiv>
            <img className='icons' src={heart} alt='heart icon'/>
            <p>{netVotes}</p>
            <img className='icons' src={speechBubble} alt='speech bubble icon' />
            <p>{commentCount}</p>
          </VoteCommentCountDiv>
          {this.props.location.pathname === '/my-articles' ? buttonJSX : ''}
          <DeleteModal
            modalShow={this.state.modalShow}
            flipModalShowState={this.flipModalShowState}
            handleDelete={this.handleDelete}
          />
          <Hr />
        </Div>
      </Fragment>
    )
  }
}

const Div = styled.div`
  width: 100%;
  :hover {
    background-color: rgb(245, 242, 240);
    cursor: pointer;
  }
  
  * {
    padding: 0 10px;
    color: rgb(102, 92, 88);
    margin: 5px 0;
  }
  
  h4 {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 150%;
  }
  
  .articleImg {
    width: 100%;
    padding: 0;
    margin-bottom: 16px;
  }
`

const AuthorDateDiv = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  height: 35px;
  img {
    height: 35px;
    width: 35px;
    margin-right: 10px;
    border-radius: 50%;
    padding: 0;
    object-fit: cover;
  }
  p {
    padding-left: 0;
  }
  p:first-of-type {
    justify-self: flex-start;
    font-weight: 500;
    line-height: 150%;
  }
  p:last-of-type {
    font-size: 0.875rem;
    margin-left: auto;
  }
`

const VoteCommentCountDiv = styled.div`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  p {
    padding: 0;
    margin: 0 20px 0 5px;
  }
  .icons {
    width: 15px;
    margin-right: 0;
    padding: 0;
  }
`

const Hr = styled.hr`
  margin: 20px 0 0 0;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
`

const ButtonStyled = styled.button`
  background-color: rgb(126, 132, 107);
  margin-right: 10px;
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
  :active, :hover {
    background-color: rgb(89, 78, 54);
    outline: none;
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
  }
`

export default withRouter(Article)
