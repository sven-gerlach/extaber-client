import axios from 'axios'
import apiUrl from '../apiConfig'

export const sendVoteOnArticleToAPI = (token, articleID, vote) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/article-votes/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      vote: {
        article: articleID,
        vote: vote
      }
    }
  })
}

export const sendVoteOnCommentToAPI = (token, commentID, vote) => {
  console.log('token: ', token)
  console.log('commentID: ', commentID)
  console.log('vote: ', vote)
  return axios({
    method: 'POST',
    url: apiUrl + '/comment-votes/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      vote: {
        comment: commentID,
        vote: vote
      }
    }
  })
}

export const removeVoteFromAPI = (token, articleID) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/articles/' + articleID + '/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}
