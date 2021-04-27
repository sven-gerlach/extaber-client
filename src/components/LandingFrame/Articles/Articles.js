import React, { Component, Fragment } from 'react'
import Article from './Article/Article'
import { getArticlesFromAPI, getFilteredArticlesFromAPI } from '../../../api/articles'
import Spinner from 'react-bootstrap/Spinner'
import { v4 as uuid } from 'uuid'
import camelcaseObjectDeep from 'camelcase-object-deep'
import styled from 'styled-components'

class Articles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: null,
      searchString: ''
    }
  }

  componentDidMount () {
    // make axios call to retrieve the latest articles
    // and store articles in component state
    getArticlesFromAPI()
      .then(res => {
        // convert object keys from snake case to camel case
        const articles = camelcaseObjectDeep(res.data.articles, { deep: true })
        this.setState({
          articles: articles
        })
      })
      .catch(console.error)
  }

  handleSearch = () => {
    // make axios call to API to retrieve relevant articles and set state
    const searchString = this.state.searchString
    getFilteredArticlesFromAPI(searchString)
      .then(res => {
        // convert object keys from snake case to camel case
        const articles = camelcaseObjectDeep(res.data.articles, { deep: true })
        this.setState({
          articles: articles
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      if (this.state.searchString.length > 0) {
        this.handleSearch(this.state.searchString)
      }
    })
  }

  render () {
    const { articles } = this.state
    if (!articles) {
      return (
        <SpinnerContainer>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </SpinnerContainer>
      )
    }

    const articlesJSX = []
    for (const article of articles) {
      articlesJSX.push(<Article key={uuid()} article={article} />)
    }

    return (
      <Fragment>
        <InputStyled
          type='text'
          name='searchString'
          value={this.state.searchString}
          placeholder='Search across title, sub-title, and body...'
          onChange={this.handleChange}
        />
        {articlesJSX}
      </Fragment>
    )
  }
}

const SpinnerContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  // set top and left margins to half the width of spinner element
  margin-top: -1rem; 
  margin-left: -1rem;
`

const InputStyled = styled.input`
  width: 100%;
  border: 10px solid rgb(245, 242, 240);
  line-height: 30px;
  padding: 5px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  outline: none;
  :focus {
    box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
  }
`

export default Articles
