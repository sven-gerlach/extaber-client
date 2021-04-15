import apiUrl from '../apiConfig'
import axios from 'axios'

export const getArticlesFromAPI = credentials => {
  return axios({
    method: 'GET',
    url: apiUrl + '/articles/'
  })
}
