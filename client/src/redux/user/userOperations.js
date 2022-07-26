import { Notify } from 'notiflix/build/notiflix-notify-aio';

import userService from 'services/userService';
import userActions from 'redux/user/userReducer';

const uploadAvatar = file => async dispatch => {
  try {
    const formData = new FormData
    formData.append('avatar', file)

    const response = await userService.uploadAvatar(formData)
    // {
    // onUploadProgress: progressEvent => {
    //   const totalLength = progressEvent.lengthComputable
    //     ? progressEvent.total
    //     : progressEvent.target.getResponseHeader('content-length')
    //     || progressEvent.target.getResponseHeader('x-decompressed-content-length')
    //   // eslint-disable-next-line no-console
    //   console.log('totalLength = ', totalLength);

    //   if (totalLength) {
    //     const progress = Math.round(progressEvent.loaded * 100 / totalLength)
    //     // eslint-disable-next-line no-console
    //     console.log('progress = ', progress);
    //   }
    // }
    // }
    dispatch(userActions.setAvatar(response.data.user.avatarURL))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const deleteAvatar = (AvatarDefault) => async dispatch => {
  try {
    const response = await userService.deleteAvatar()

    dispatch(userActions.unsetAvatar(AvatarDefault))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const changePassword = async (credentials) => {
  try {
    const response = await userService.changePassword(credentials)

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const updateSubscription = subscriptionUpdate => async dispatch => {
  try {
    const response = await userService.updateSubscription({ subscription: subscriptionUpdate })

    dispatch(userActions.setSubscription(response.data.user.subscription))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const deleteUser = () => async dispatch => {
  try {
    const response = await userService.deleteUser()

    if (response) { window.location.href = '/login' }

    dispatch(userActions.resetStateUser())

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export default { uploadAvatar, deleteAvatar, changePassword, updateSubscription, deleteUser }
