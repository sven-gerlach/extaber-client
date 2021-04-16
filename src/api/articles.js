import apiUrl from '../apiConfig'
import axios from 'axios'

export const getArticlesFromAPI = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/articles/'
  })
}

export const getMyArticlesFromAPI = token => {
  return axios({
    method: 'GET',
    url: apiUrl + '/my-articles/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const getArticleFromAPI = articleID => {
  return axios({
    method: 'GET',
    url: apiUrl + '/article/' + articleID + '/'
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

export const sendUpdatedArticleToAPI = (article, token) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/articles/' + article.id + '/',
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
