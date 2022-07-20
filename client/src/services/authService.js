import axios from 'axios'

import $api from '../http'

const signup = async (credentials) => {
  const response = await axios.post('/auth/signup', credentials)
  return response
}

const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials)
  return response
}

const logout = async () => {
  const response = await $api.get('/auth/logout')
  return response
}

const refresh = async () => {
  const response = await axios.get('/auth/refresh')
  return response
}

const resend = async (email) => {
  const response = await axios.post('/auth/verify', { email })
  return response
}

export default { signup, login, logout, refresh, resend, }