import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

export const $api = axios.create()

/* eslint-disable no-param-reassign */
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  config.headers.common.Authorization = `Bearer ${token}`
  return config
})
/* eslint-disable no-param-reassign */

$api.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config.isRetry) {
      originalRequest.isRetry = true

      try {
        const response = await axios.get('/auth/refresh')
        const { accessToken } = response.data

        localStorage.setItem('accessToken', accessToken)

        $api.request(originalRequest)
      } catch (e) {
        Notify.failure(e.message || 'User is not authorized');
      }
    }

    throw error
  }
)