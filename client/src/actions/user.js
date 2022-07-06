import axios from 'axios'
import { setUser, unsetUser } from '../reducers/userReducer';

export const signup = async (email, password) => {
  try {
    const response = await axios
      .post(
        'http://localhost:5000/auth/signup',
        { email, password }
      )
    // eslint-disable-next-line no-console
    console.log(response.data.message)
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const response = await axios
      .post(
        'http://localhost:5000/auth/login',
        { email, password }
      )

    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)
    dispatch(setUser(user))
    // eslint-disable-next-line no-console
    console.log(response.data.message);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const logout = () => async dispatch => {
  const token = localStorage.getItem('accessToken')

  try {
    await axios
      .get(
        'http://localhost:5000/auth/logout',
        { headers: { Authorization: `Bearer ${token}` } }
      )

    localStorage.removeItem('accessToken')
    dispatch(unsetUser())
    // eslint-disable-next-line no-console
    console.log('Logout successful')
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const current = () => async dispatch => {
  try {
    const token = localStorage.getItem('accessToken')

    const response = await axios
      .get(
        'http://localhost:5000/auth/current',
        { headers: { Authorization: `Bearer ${token}` } }
      )

    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)
    dispatch(setUser(user))
    // eslint-disable-next-line no-console
    console.log(response.data.message)
  } catch (e) {
    localStorage.removeItem('accessToken')
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}
