import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const $api = axios.create()

/* eslint-disable no-param-reassign */
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
/* eslint-disable no-param-reassign */

$api.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401
      && error.config
      && !error.config.isRetry) {

      error.config.isRetry = true

      try {
        const response = await axios.get('/auth/refresh')
        const { accessToken } = response.data

        localStorage.setItem('accessToken', accessToken)

        const res = await $api.request(originalRequest)

        if (res.status === 204) { // при неудаче разлогина с 1го раза из-за просроченного accessToken, после рефреша, при повторном разлогине в интерцепторе чистим localStorage от токена
          localStorage.removeItem('accessToken')
          Notify.success('Logout successful')
        }
      } catch (e) {
        Notify.failure(e.message || 'Not authorized. Axios response interceptor error');
      }
    }

    throw error
  }
)

export default $api