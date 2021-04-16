import axios from 'axios'
import apiUrl from '../apiConfig'

export const sendVoteToAPI = (token, articleID, vote) => {
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

export const removeVoteFromAPI = (token, articleID) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/articles/' + articleID + '/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}
