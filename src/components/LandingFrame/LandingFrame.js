import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Articles from './Articles/Articles'

class LandingFrame extends Component {
  render () {
    return (
      <Container className='mt-3'>
        <Col>
          <Row>
            <Articles />
          </Row>
        </Col>
      </Container>
    )
  }
}

export default LandingFrame
