import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Articles from './Articles/Articles'
import styled from 'styled-components'

class LandingFrame extends Component {
  render () {
    return (
      <ColStyled>
        <Row>
          <Articles />
        </Row>
      </ColStyled>
    )
  }
}

const ColStyled = styled(Col)`
  margin-top: 90px;
  flex-direction: column;
`

export default LandingFrame
