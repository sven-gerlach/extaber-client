import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { sendArticleToAPI } from '../../api/articles'

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

  handleChange = event => {
    this.setState({
      article: {
        ...this.state.article,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const token = this.props.user.token
    const article = this.state.article
    sendArticleToAPI(article, token)
      .then(console.log)
      .catch(console.error)
  }

  render () {
    const { article } = this.state
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
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Create
