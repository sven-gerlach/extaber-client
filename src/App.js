import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EasySignInModal from './components/Modal/EasySignInModal'

// Importing components
import LandingFrame from './components/LandingFrame/LandingFrame'
import Create from './components/Create/Create'
import MyArticles from './components/MyArticles/MyArticles'
import UpdateArticle from './components/UpdateArticle/UpdateArticle'
import ViewArticle from './components/ViewArticle/ViewArticle'
import MyDetails from './components/MyDetails/MyDetails'
import AboutUs from './components/AboutUs/AboutUs'
import { signIn, signUp } from './api/auth'
import messages from './components/AutoDismissAlert/messages'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      isModal: false,
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isModal: true
      })
    }, 1000)
  }

  setUser = user => this.setState({ user })

  updateUser = user => {
    user = { ...this.state.user, ...user }
    this.setState({
      user: user
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModal: false
    })
  }

  handleExpeditedSignUp = () => {
    Promise.resolve()
      .then(() => this.setRandomSignUpDetails())
      .then(() => this.onSignUp())
      .catch()
  }

  makeRandomString = length => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  setRandomSignUpDetails = () => {
    // sets a random user profile which is needed if users prefer to not sign-in with their email
    const password = this.makeRandomString(5)
    this.setState({
      email: `${this.makeRandomString(10)}@random.com`,
      password: password,
      passwordConfirmation: password
    })
  }

  onSignUp = event => {
    if (event) event.preventDefault()
    const { history } = this.props
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => this.setUser(res.data.user))
      .then(() => this.msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => {
        if (this.props.location.pathname !== '/') {
          history.push('/')
        }
      })
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        this.msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { msgAlerts, user, isModal } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <ContainerStyled>
          <Row className='justify-content-center'>
            <Col xs={12} sm={12} md={10} lg={8}>
              <EasySignInModal
                isModal={isModal}
                user={user}
                handleCloseModal={this.handleCloseModal}
                handleExpeditedSignUp={this.handleExpeditedSignUp}
              />
              <Route path='/sign-up' render={() => (
                <SignUp
                  msgAlert={this.msgAlert}
                  setUser={this.setUser}
                  onSignUp={this.onSignUp}
                  handleChange={this.handleChange}
                  email={this.state.email}
                  password={this.state.password}
                  passwordConfirmation={this.state.passwordConfirmation}
                />
              )} />
              <Route path='/sign-in' render={() => (
                <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              )} />
              <Route exact path='/' render={() => (
                <LandingFrame />
              )}/>
              <Route exact path='/about-us' render={() => (
                <AboutUs />
              )}/>
              <Route path='/view-article/:id' render={() => (
                <ViewArticle msgAlert={this.msgAlert} user={user} />
              )}/>
              <AuthenticatedRoute user={user} path='/create' render={() => (
                <Create msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/my-articles' render={() => (
                <MyArticles msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/update-article/:id' render={() => (
                <UpdateArticle msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/change-password' render={() => (
                <ChangePassword msgAlert={this.msgAlert} user={user} />
              )} />
              <AuthenticatedRoute user={user} path='/my-details' render={() => (
                <MyDetails msgAlert={this.msgAlert} user={user} updateUser={this.updateUser} />
              )} />
            </Col>
          </Row>
        </ContainerStyled>
      </Fragment>
    )
  }
}

const ContainerStyled = styled(Container)`
  @media (max-width: 575px) {
    padding: 0;
  }
`

export default withRouter(App)
