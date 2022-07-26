import { Notify } from 'notiflix/build/notiflix-notify-aio';

import userService from 'services/userService';
import userActions from 'redux/user/userReducer';
import uploaderAction from 'redux/uploader/uploaderReducer'

const updateAvatar = (file) => async dispatch => {
  try {
    dispatch(uploaderAction.setShowUploader())
    dispatch(uploaderAction.setFileName(file.name))

    const formData = new FormData
    formData.append('avatar', file)

    const onUploadProgress = (progressEvent) => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length')
        || progressEvent.target.getResponseHeader('x-decompressed-content-length')

      if (totalLength) {
        const progress = Math.round(progressEvent.loaded * 100 / totalLength)
        dispatch(uploaderAction.setFileProgress(progress))
      }
    }

    const response = await userService.updateAvatar(formData, onUploadProgress)

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

const updatePassword = async (credentials) => {
  try {
    const response = await userService.updatePassword(credentials)

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const updateSubscription = (subscriptionUpdate) => async dispatch => {
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

export default {
  updateAvatar,
  deleteAvatar,
  updatePassword,
  updateSubscription,
  deleteUser
}
