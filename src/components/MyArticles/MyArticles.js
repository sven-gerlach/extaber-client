import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getMyArticlesFromAPI } from '../../api/articles'
import Article from '../LandingFrame/Articles/Article/Article'
import Spinner from 'react-bootstrap/Spinner'
import { v4 as uuid } from 'uuid'
import camelcaseObjectDeep from 'camelcase-object-deep'

class MyArticles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myArticles: null
    }
  }

  componentDidMount () {
    this.updateMyArticles()
  }

  updateMyArticles = () => {
    console.log(this.props)
    const token = this.props.user.token
    getMyArticlesFromAPI(token)
      .then(res => {
        // convert object keys from snake case to camel case
        const myArticles = camelcaseObjectDeep(res.data.my_articles, { deep: true })
        this.setState({
          myArticles: myArticles
        })
      })
  }

  render () {
    const { myArticles } = this.state
    const { user } = this.props
    if (!myArticles) {
      return (
        <Container className='mt-3'>
          <Col>
            <Row>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Row>
          </Col>
        </Container>
      )
    }

    const myArticlesJSX = []
    for (const article of myArticles) {
      myArticlesJSX.push(<Article
        key={uuid()}
        article={article}
        user={user}
        updateMyArticles={this.updateMyArticles}
      />)
    }

    return (
      <Container className='mt-3'>
        <Col>
          <Row>
            <h3>My Articles</h3>
            { myArticlesJSX }
          </Row>
        </Col>
      </Container>
    )
  }
}

export default MyArticles
