import React, { Component, Fragment } from 'react'
import { deleteMyArticleFromAPI } from '../../../../api/articles'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getFormattedDateTime } from '../../../../utils/utils'
import heart from '../../../../assets/img/Heart.svg'
import speechBubble from '../../../../assets/img/Speech_bubble.png'

class Article extends Component {
  handleSelectArticle = event => {
    event.preventDefault()
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

  render () {
    // todo: implement comments here
    const {
      imgUrl,
      title,
      subTitle,
      createdAt,
      author,
      body,
      netVotes,
      commentCount
    } = this.props.article

    const buttonJSX = (
      <ButtonContainer>
        <ButtonStyled type='button' onClick={this.handleDelete}>Delete</ButtonStyled>
        <ButtonStyled type='button' onClick={this.handleUpdate}>Update</ButtonStyled>
      </ButtonContainer>
    )

    return (
      <Fragment>
        <Div onClick={this.handleSelectArticle}>
          <AuthorDateDiv>
            <p>{author}</p>
            <p>{getFormattedDateTime(createdAt)}</p>
          </AuthorDateDiv>
          <h4>{title}</h4>
          {subTitle ? <p>{subTitle}</p> : ''}
          {imgUrl ? <div><img src={imgUrl} /></div> : '' }
          <p>{body}</p>
          <VoteCommentCountDiv>
            <img src={heart} alt='heart icon'/>
            <p>{netVotes}</p>
            <img src={speechBubble} alt='speech bubble icon' />
            <p>{commentCount}</p>
          </VoteCommentCountDiv>
          {this.props.location.pathname === '/my-articles' ? buttonJSX : ''}
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
  }
  
  h4 {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 150%;
  }
  
  img {
    width: 100%;
    padding: 0;
    margin-bottom: 16px;
  }
`

const AuthorDateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  p {
    padding-left: 0;
  }
  p:first-of-type {
    font-weight: 500;
    line-height: 150%;
  }
  p:last-of-type {
    font-size: 0.875rem;
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
  > img {
    height: 13px;
    width: 13px;
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
