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
    // response.data = {
    //   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MTI5MzE4LCJleHAiOjE2NTgxMjkzMzN9.DCeqAyK5Zg50ZJmoj6kBUdSr-JtQleyuzbIiubp1d_4",
    //   code: 200,
    //   message: "Refresh successfull",
    //   status: "Ok",
    //   user: {
    //     avatarURL: "http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG",
    //     email: "test@mail.ua",
    //     id: "62d1b0e0bfde815a5f0690d8",
    //     role: "user",
    //     subscription: "business",
    //     verified: true,
    //   },
    // }
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

export default { signup, login, logout, refresh }