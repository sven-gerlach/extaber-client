import React, { Component, Fragment } from 'react'
import Article from './Article/Article'
import { getArticlesFromAPI } from '../../../api/articles'
import Spinner from 'react-bootstrap/Spinner'

class Articles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: null
    }
  }

  componentDidMount () {
    // make axios call to retrieve the latest articles
    // and store articles in component state
    getArticlesFromAPI()
      .then(res => this.setState({
        articles: res.data.articles
      }))
  }

  render () {
    const { articles } = this.state
    if (!articles) {
      return (
        <Fragment>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Article articles={articles} />
      </Fragment>
    )
  }
}

export default Articles
