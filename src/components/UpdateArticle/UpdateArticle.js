import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import camelcaseObjectDeep from 'camelcase-object-deep'
import { getArticleFromAPI } from '../../api/articles'
import Create from '../Create/Create'
import Spinner from 'react-bootstrap/Spinner'

class UpdateArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null
    }
  }

  componentDidMount () {
    // make axios call to retrieve the article's details
    const articleID = this.props.match.params.id
    const token = this.props.user.token
    getArticleFromAPI(articleID, token)
      .then(res => {
        // convert obj from snake- to camel-case
        const article = camelcaseObjectDeep(res.data.article, { deep: true })
        this.setState({
          article
        })
      })
      .catch(console.error)
  }

  render () {
    const { article } = this.state
    if (!article) {
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

    return (
      <Fragment>
        <Create article={article} user={this.props.user} />
      </Fragment>
    )
  }
}

export default withRouter(UpdateArticle)
