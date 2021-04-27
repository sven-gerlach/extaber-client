import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

class AboutUs extends Component {
  render () {
    return (
      <ColStyled>
        <Row>
          <h4>About Us</h4>
          <p>ExTABER is a platform where independent investigative journalists can publish their work, create a readership, and
            potentially monetise their work. The ethos underlying ExTABER is hidden in form of an anagram in its name. The
            anagram is based on the epistemological viewpoint that free thought must exist <b>Ex</b> <b>T</b>radition, <b>A</b>uthority, <b>E</b>stablished <b>B</b>elief, and <b>R</b>evelation.</p>
        </Row>
      </ColStyled>
    )
  }
}

const ColStyled = styled(Col)`
  margin-top: 90px;
  flex-direction: column;
  h4,
  p {
    padding: 0 10px;
  }
`

export default AboutUs
