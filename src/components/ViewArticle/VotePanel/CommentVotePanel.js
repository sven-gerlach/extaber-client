import React, { Component } from 'react'
import styled from 'styled-components'
import Flip from 'react-reveal/Flip'

class CommentVotePanel extends Component {
  handleClick = (event, vote, commentIDSelected) => {
    const {
      invertCommentVotePanel,
      handleCommentVote
    } = this.props
    handleCommentVote(event, commentIDSelected, vote)
    setTimeout(invertCommentVotePanel, 1000)
  }

  render () {
    const {
      isCommentVotePanelDisplayed,
      commentID,
      commentIDSelected
    } = this.props

    const commentMatch = commentID === commentIDSelected

    return (
      <div>
        <Flip top when={isCommentVotePanelDisplayed && commentMatch}>
          <VotePanelStyled>
            <p id={'downVote'} onClick={(event) => this.handleClick(event, -1, commentIDSelected)}>-</p>
            <p id={'removeVote'} onClick={(event) => this.handleClick(event, 0, commentIDSelected)}>x</p>
            <p id={'upVote'} onClick={(event) => this.handleClick(event, +1, commentIDSelected)}>+</p>
          </VotePanelStyled>
        </Flip>
      </div>
    )
  }
}

const VotePanelStyled = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  left: 50px;
  align-items: center;
  border-radius: 10px;
  background-color: rgb(245, 242, 240);
  padding: 5px 10px;
  
  p {
    margin: 0 4px;
    font-weight: bold;
    line-height: 20px;
  }
  
  #downVote {
    color: darkred;
    background-color: white;
    border-radius: 5px;
    padding: 1px 10px;
    transition: background-color ease-in-out 400ms, color ease-in-out 400ms;
    :hover {
      cursor: pointer;
      background-color: darkred;
      color: white;
    }
  }
  
  #removeVote {
    color: darkred;
    font-weight: normal;
    border-radius: 5px;
    padding: 1px 10px;
    transition: background-color ease-in-out 400ms, color ease-in-out 400ms;

    :hover {
      cursor: pointer;
      background-color: darkred;
      color: white;
    }
  }

  #upVote {
    color: darkgreen;
    background-color: white;
    border-radius: 5px;
    padding: 1px 10px;
    transition: background-color ease-in-out 400ms, color ease-in-out 400ms;
    :hover {
      cursor: pointer;
      background-color: darkgreen;
      color: white;
    }
  }
`

export default CommentVotePanel
