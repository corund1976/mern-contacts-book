import axios from 'axios'

import { setIsAuth, unsetIsAuth } from '../auth/authReducer';
import { setUser, unsetUser } from './userReducer';
import { unsetContacts } from '../contact/contactReducer';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const tokeN = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signup = async (credentials) => {
  try {
    const response = await axios.post('/auth/signup', credentials)

    if (response) {
      window.location.href = '/login';
    }
    // eslint-disable-next-line no-console
    console.log(response.data.message)
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const login = credentials => async dispatch => {
  try {
    const response = await axios.post('/auth/login', credentials)

    const { accessToken, user } = response.data

    tokeN.set(accessToken)
    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(user))
    dispatch(setIsAuth())
    // eslint-disable-next-line no-console
    console.log(response.data.message);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const logout = () => async dispatch => {
  // const token = localStorage.getItem('accessToken')

  try {
    await axios.get('/auth/logout')

    tokeN.unset()
    localStorage.removeItem('accessToken')

    dispatch(unsetIsAuth())
    dispatch(unsetUser())
    dispatch(unsetContacts())
    // eslint-disable-next-line no-console
    console.log('Logout successful')
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const fetchCurrentUser = () => async dispatch => {
  try {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      return
    }

    tokeN.set(token)

    const response = await axios.get('/auth/current')

    const { accessToken, user } = response.data

    tokeN.set(accessToken)
    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(user))
    dispatch(setIsAuth())
    // eslint-disable-next-line no-console
    console.log(response.data.message)
  } catch (e) {
    localStorage.removeItem('accessToken')
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}
