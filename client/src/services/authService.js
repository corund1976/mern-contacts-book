import { $api } from '../http';

const signup = async (credentials) => {
  const result = await $api.post('/auth/signup', credentials)
  return result
}

const login = async (credentials) => {
  const result = await $api.post('/auth/login', credentials)
  return result
}

const logout = async () => {
  const result = await $api.get('/auth/logout')
  return result
}

const refresh = async () => {
  const result = await $api.get('/auth/refresh')
  return result
}

const authService = {
  signup, login, logout, refresh
}

export default authService