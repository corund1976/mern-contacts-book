import { Notify } from 'notiflix/build/notiflix-notify-aio';

import authService from 'services/authService';
import authAction from 'redux/auth/authReducer';
import userActions from 'redux/user/userReducer';
import contactAction from 'redux/contact/contactReducer';

const signup = async (credentials) => {
  try {
    const response = await authService.signup(credentials)

    if (response) { window.location.href = '/login' }

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const login = credentials => async dispatch => {
  try {
    const response = await authService.login(credentials)
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch(userActions.setUser(user));
    dispatch(authAction.setIsAuth())

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const logout = () => async dispatch => {
  try {
    await authService.logout()

    localStorage.removeItem('accessToken')

    dispatch(authAction.unsetIsAuth())
    dispatch(userActions.unsetUser())
    dispatch(contactAction.unsetContacts())

    Notify.success('Logout successful')
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const refresh = () => async dispatch => {
  const token = localStorage.getItem('accessToken')

  if (!token) return

  try {
    const response = await authService.refresh()
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch(userActions.setUser(user))
    dispatch(authAction.setIsAuth())

    Notify.success(response.data.message)
  } catch (e) {
    localStorage.removeItem('accessToken')

    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const authOperation = { signup, login, logout, refresh }

export default authOperation