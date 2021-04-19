import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
  sendArticleToAPI,
  sendUpdatedArticleToAPI
} from '../../api/articles'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import marked from 'marked'
import DOMPurify from 'dompurify'

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
    this.textAreaRef = React.createRef()
  }

  componentDidMount () {
    if (this.props.match.path.includes('update-article')) {
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
    this.textAreaChange(this.textAreaRef.current)
  }

  textAreaChange (text) {
    text.style.height = 'auto'
    text.style.height = text.scrollHeight + 'px'
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

  createCleanedMarkup = () => {
    const dirtyHTML = marked(this.state.article.body)
    const cleanHTML = DOMPurify.sanitize(dirtyHTML)
    return { __html: cleanHTML }
  }

  render () {
    const { article } = this.state
    const handleSubmit = this.props.match.path === '/create' ? this.handleCreate : this.handleUpdate
    return (
      <DivStyled>
        <Col>
          <Row>
            <FormStyled onSubmit={handleSubmit}>
              <textarea
                // type='text'
                name='title'
                value={article.title}
                placeholder='Enter title...'
                required={true}
                onChange={this.handleChange}
                wrap='soft'
              />
              <textarea
                // type='text'
                name='subTitle'
                value={article.subTitle}
                placeholder='Enter sub-title...'
                required={false}
                onChange={this.handleChange}
              />
              <input
                type='text'
                name='imgUrl'
                value={article.imgUrl}
                placeholder='Enter image url...'
                required={false}
                onChange={this.handleChange}
              />
              {article.imgUrl ? <div><img src={article.imgUrl} /></div> : '' }
              <Tabs defaultActiveKey="write" id="write">
                <Tab eventKey="write" title="Write">
                  <textarea
                    ref={this.textAreaRef}
                    name='body'
                    value={article.body}
                    placeholder='Enter article body...feel free to use markdown.'
                    required={true}
                    onChange={(event) => {
                      this.handleChange(event)
                      this.textAreaChange(event.target)
                    }}
                  />
                </Tab>
                <Tab eventKey="preview" title="Preview">
                  <PreviewDiv>
                    <div dangerouslySetInnerHTML={this.createCleanedMarkup()} />
                  </PreviewDiv>
                </Tab>
              </Tabs>
              <button
                type='submit'
              >
                Submit
              </button>
            </FormStyled>
          </Row>
        </Col>
      </DivStyled>
    )
  }
}

const DivStyled = styled.div`
  margin: 90px 10px 0 10px;
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  input {
    border: none;
    padding: 0.375rem 0.75rem;
    overflow-wrap: normal;
    :focus {
      outline: none;
      border: none;
    }
  }
  
  > textarea:nth-child(1) {
    font-size: 2em;
    line-height: 1.1em;
    font-weight: 700;
    margin: 5px 0;
    color: black;
    border: none;
    overflow: auto;
    overflow-wrap: normal;
    outline: none;
    resize: none;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    height: 90px;
  }
  
  > textarea:nth-child(2) {
    font-size: 19px;
    line-height: 1.1em;
    font-weight: 700;
    margin: 5px 0;
    color: black;
    border: none;
    overflow: auto;
    overflow-wrap: normal;
    outline: none;
    resize: none;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    height: 70px;
  }
  
  input:nth-child(3) {
    font-size: 14px;
    margin: 5px 0 20px 0;
  }
  
  img {
    width: 100%;
    margin-bottom: 25px;
  }

  textarea {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    :focus {
      outline: none;
      box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
      border-color: rgb(89, 78, 54);
    }
  }

  button {
    margin: 20px 0;
    justify-self: flex-end;
    max-width: 150px;
    background-color: rgb(126, 132, 107);
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
    :active {
      background-color: rgb(89, 78, 54);
      outline: none;
      box-shadow: 0 0 2px 2px rgba(89, 78, 54, 0.5);
    }
  }
`

const PreviewDiv = styled.div`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  min-height: 70px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  outline: none;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`

export default withRouter(Create)
