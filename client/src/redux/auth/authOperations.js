import { Notify } from 'notiflix/build/notiflix-notify-aio';

import authService from '../../services/authService';
import { setIsAuth, unsetIsAuth } from './authReducer';
import { setUser, unsetUser } from '../user/userReducer';
import { unsetContacts } from '../contact/contactReducer';
import { loaderActions } from '../loader/loaderReducer'

export const signup = async (credentials) => {
  try {
    const response = await authService.signup(credentials)

    if (response) window.location.href = '/login'

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export const login = credentials => async dispatch => {
  try {
    const response = await authService.login(credentials)
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(user));
    dispatch(setIsAuth())

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export const logout = () => async dispatch => {
  try {
    await authService.logout()

    localStorage.removeItem('accessToken')

    dispatch(unsetIsAuth())
    dispatch(unsetUser())
    dispatch(unsetContacts())

    Notify.success('Logout successful')
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export const refresh = () => async dispatch => {
  try {
    dispatch(loaderActions.setIsLoading())

    const response = await authService.refresh()
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(user))
    dispatch(setIsAuth())

    Notify.success(response.data.message)
  } catch (e) {
    localStorage.removeItem('accessToken')
    Notify.failure(e.response?.data?.message || "Request failure")
  } finally {
    dispatch(loaderActions.unsetIsLoading())
  }
}