import axios from 'axios'
import apiUrl from '../apiConfig'

export const getCommentsFromAPI = articleID => {
  return axios({
    method: 'GET',
    url: apiUrl + '/comments/' + articleID + '/'
  })
}

export const sendCommentToAPI = (token, articleID, comment) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/comments/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      comment: {
        body: comment,
        article: articleID
      }
    }
  })
}
