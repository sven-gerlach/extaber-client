import React, { Component, Fragment } from 'react'
import { deleteMyArticleFromAPI } from '../../../../api/articles'
import { withRouter } from 'react-router-dom'

class Article extends Component {
  handleDelete = event => {
    event.preventDefault()
    console.log(this.props)
    const token = this.props.user.token
    const articleID = this.props.article.id
    deleteMyArticleFromAPI(token, articleID)
      .then(this.props.updateMyArticles)
      .catch(console.error)
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
      <div>
        <button type='button' onClick={this.handleDelete}>Delete</button>
        <button type='button'>Update</button>
      </div>
    )

    return (
      <Fragment>
        <div>
          {imgUrl ? <div><img src={imgUrl} /></div> : '' }
          <h4>{title}</h4>
          {subTitle ? <p>{subTitle}</p> : ''}
          <p>{author}</p>
          <p>{body}</p>
          <p>{createdAt}</p>
          <p>{netVotes}</p>
          <p>{commentCount}</p>
          {this.props.location.pathname === '/my-articles' ? buttonJSX : ''}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Article)
