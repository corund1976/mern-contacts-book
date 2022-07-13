import axios from 'axios'

import { setAvatar, unsetAvatar, setSubscription, unsetUser } from './userReducer';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const uploadAvatar = file => async dispatch => {
  try {
    const formData = new FormData
    formData.append('avatar', file)

    const response = await axios.patch('/users/avatars', formData, {
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length')
          || progressEvent.target.getResponseHeader('x-decompressed-content-length')
        // eslint-disable-next-line no-console
        console.log('totalLength = ', totalLength);

        if (totalLength) {
          const progress = Math.round(progressEvent.loaded * 100 / totalLength)
          // eslint-disable-next-line no-console
          console.log('progress = ', progress);
        }
      }
    })

    dispatch(setAvatar(response.data.user.avatarURL))
    // eslint-disable-next-line no-console
    console.log(response.data.user);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const deleteAvatar = () => async dispatch => {
  try {
    const response = await axios.delete('/users/avatars')

    dispatch(unsetAvatar())
    // eslint-disable-next-line no-console
    console.log(response.data.user);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const updateSubscription = subscriptionUpdate => async dispatch => {
  try {
    const response = await axios.patch('/users/subscription', { subscription: subscriptionUpdate })

    dispatch(setSubscription(response.data.user.subscription))
    // eslint-disable-next-line no-console
    console.log(response.data.user);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}

export const deleteUser = () => async dispatch => {
  try {
    const response = await axios.delete('/users')

    if (response) {
      window.location.href = '/login';
    }

    dispatch(unsetUser())
    // eslint-disable-next-line no-console
    console.log(response.data.message);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}
