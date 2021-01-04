import axios from 'axios'
import firebase from 'firebase/app'
import config from '../config'
import { Notification } from '../helpers/appUtils'

const request = axios.create({
  baseURL: config?.baseUrlApi
})

export const requestWithoutVerification = axios.create({
  baseURL: config?.baseUrlApi
})

request.interceptors.request.use((config) => {
  return firebase.auth().currentUser.getIdToken(true).then((userAuthToken) => {
    config.headers = {
      ...config.headers,
      'user-auth': userAuthToken
    }
    return config
  })
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use((config) => {
  return config
}, function (error) {
  if (error.response?.data?.message === 'user_process_id_auth_error') {
    Notification.error('You are not authorized for this process!')
    setTimeout(() => { window.location.href = '/' }, 2000)
    return
  }
  return Promise.reject(error)
})

export default request
