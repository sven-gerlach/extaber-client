import React, { Component, Fragment } from 'react'
import Article from './Article/Article'
import { getArticlesFromAPI } from '../../../api/articles'
import Spinner from 'react-bootstrap/Spinner'
import { v4 as uuid } from 'uuid'
import camelcaseObjectDeep from 'camelcase-object-deep'

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
      // .then(res => console.log(res.data.articles))
      .then(res => {
        // convert object keys from snake case to camel case
        const articles = camelcaseObjectDeep(res.data.articles, { deep: true })
        this.setState({
          articles: articles
        })
      })
      .catch(console.error)
  }

  render () {
    const { articles, user } = this.state
    if (!articles) {
      return (
        <Fragment>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Fragment>
      )
    }

    const articlesJSX = []
    for (const article of articles) {
      articlesJSX.push(<Article key={uuid()} article={article} user={user} />)
    }

    return (
      <Fragment>
        {articlesJSX}
      </Fragment>
    )
  }
}

export default Articles
