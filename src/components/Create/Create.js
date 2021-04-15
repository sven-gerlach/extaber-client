import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  sendArticleToAPI,
  sendUpdatedArticleToAPI
} from '../../api/articles'
import { withRouter } from 'react-router-dom'

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: {
        imgUrl: '',
        title: '',
        subTitle: '',
        body: ''
      }
    }
  }

  componentDidMount () {
    if (this.props.match.path.includes('update-article')) {
      console.log(this.props)
      const { id, imgUrl, title, subTitle, body } = this.props.article
      this.setState({
        article: {
          id: id,
          imgUrl: imgUrl,
          title: title,
          subTitle: subTitle,
          body: body
        }
      })
    }
  }

  handleChange = event => {
    this.setState({
      article: {
        ...this.state.article,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCreate = event => {
    event.preventDefault()
    const token = this.props.user.token
    const article = this.state.article
    sendArticleToAPI(article, token)
      .then(() => {
        this.props.history.push('/my-articles')
      })
      .catch(console.error)
  }

  handleUpdate = event => {
    event.preventDefault()
    const token = this.props.user.token
    const article = this.state.article
    sendUpdatedArticleToAPI(article, token)
      .then(() => {
        this.props.history.push('/my-articles')
      })
      .catch(console.error)
  }

  render () {
    const { article } = this.state
    console.log(this.props)
    const handleSubmit = this.props.match.path === '/create' ? this.handleCreate : this.handleUpdate
    return (
      <Container className='mt-3'>
        <Col>
          <Row>
            <h3>Create</h3>
            <input
              type='text'
              name='imgUrl'
              value={article.imgUrl}
              placeholder='[IMG URL]'
              required={false}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='title'
              value={article.title}
              placeholder='[TITLE]'
              required={true}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='subTitle'
              value={article.subTitle}
              placeholder='[SUB-TITLE]'
              required={false}
              onChange={this.handleChange}
            />
            <input
              type='textarea'
              name='body'
              value={article.body}
              placeholder='[body]'
              required={true}
              onChange={this.handleChange}
            />
            <button
              type='button'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default withRouter(Create)
