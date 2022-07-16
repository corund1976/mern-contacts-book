import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const token = localStorage.getItem('accessToken')

const axiosConfigWithAuthHeader = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
}

export const $api = axios.create(axiosConfigWithAuthHeader)

$api.interceptors.request.use((config) => config)

$api.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config.isRetry) {
      originalRequest.isRetry = true

      try {
        const axiosConfigWithoutAuthHeader = {
          baseURL: process.env.REACT_APP_API_URL,
          withCredentials: true,
        }
        const response = await axios.get('/auth/refresh', axiosConfigWithoutAuthHeader)
        const { accessToken } = response.data

        localStorage.setItem('accessToken', accessToken)

        $api.request(originalRequest)
      } catch (e) {
        Notify.failure('---User is not authorized---');
      }
    }

    throw error
  })

export default $api 
