import React, { Component, Fragment } from 'react'
import { v4 as uuid } from 'uuid'

class Comments extends Component {
  render () {
    return (
      <Fragment>
        {this.props.comments.map(comment => {
          return (
            <div key={uuid()}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p>{comment.netVotes}</p>
              <p>{comment.createdAt}</p>
              {/* todo: the create and update times are different by the tiniest margin */}
              {/* {comment.createdAt === comment.updatedAt ? '' : <p>{comment.updatedAt}</p>} */}
            </div>
          )
        })}
      </Fragment>
    )
  }
}

export default Comments
