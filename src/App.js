import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import styled from 'styled-components'

// Importing components
import LandingFrame from './components/LandingFrame/LandingFrame'
import Create from './components/Create/Create'
import MyArticles from './components/MyArticles/MyArticles'
import UpdateArticle from './components/UpdateArticle/UpdateArticle'
import ViewArticle from './components/ViewArticle/ViewArticle'
import MyDetails from './components/MyDetails/MyDetails'
import AboutUs from './components/AboutUs/AboutUs'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  updateUser = user => {
    user = { ...this.state.user, ...user }
    this.setState({
      user: user
    })
  }

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

  render () {
    const { msgAlerts, user } = this.state

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
        <MainStyled className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
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
        </MainStyled>
      </Fragment>
    )
  }
}

const MainStyled = styled.main`
  @media (max-width: 575px) {
    padding: 0;
  }
`

export default App
