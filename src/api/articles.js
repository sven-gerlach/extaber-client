import apiUrl from '../apiConfig'
import axios from 'axios'

export const getArticlesFromAPI = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/articles/'
  })
}

export const getMyArticlesFromAPI = token => {
  console.log(token)
  return axios({
    method: 'GET',
    url: apiUrl + '/my-articles/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const sendArticleToAPI = (article, token) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/articles/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      article: {
        img_url: article.imgUrl,
        title: article.title,
        sub_title: article.subTitle,
        body: article.body
      }
    }
  })
}

export const deleteMyArticleFromAPI = (token, articleID) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/articles/' + articleID + '/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}
