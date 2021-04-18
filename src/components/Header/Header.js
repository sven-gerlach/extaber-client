import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import taborDrumImg from '../../assets/img/tabor_img.png'
import styled from 'styled-components'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#create">Create</Nav.Link>
    <Nav.Link href="#my-articles">My Articles</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <NavbarStyled bg="light" expand="lg" collapseOnSelect="true" fixed='top'>
    <Navbar.Brand href="#">
      <img
        alt="Image of a tabor drum"
        src={taborDrumImg}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />&nbsp;
      ExTABER
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <NavbarToggleStyled id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </NavbarToggleStyled>
  </NavbarStyled>
)

const NavbarStyled = styled(Navbar)`
  background-color: rgb(165, 174, 158);
  box-shadow: 0 3px 7px 1px rgba(0,0,0,.07),0 -3px 7px 1px rgba(0,0,0,.07);
  & input, textarea, button {
    outline-color: rgb(89, 78, 54);
  }
`

const NavbarToggleStyled = styled(Navbar.Collapse)`
  button:focus {
    border: none;
  }
`

export default Header
