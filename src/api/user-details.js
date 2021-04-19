import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUserDetailFromAPI = token => {
  return axios({
    method: 'GET',
    url: apiUrl + '/get-user-details/',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const sendUpdatedUserDetailsToAPI = (token, updatedUserDetails) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/update-user-details/',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      user: {
        username: updatedUserDetails.username,
        user_img_url: updatedUserDetails.userImgUrl
      }
    }
  })
}
