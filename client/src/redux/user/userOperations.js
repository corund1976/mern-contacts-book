import { Notify } from 'notiflix/build/notiflix-notify-aio';

import userService from '../../services/userService';
import { setAvatar, unsetAvatar, setSubscription, unsetUser } from './userReducer';
import { setIsLoading, unsetIsLoading } from '../loader/loaderReducer'

export const uploadAvatar = file => async dispatch => {
  dispatch(setIsLoading())
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
    dispatch(setAvatar(response.data.user.avatarURL))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  } finally {
    dispatch(unsetIsLoading())
  }
}

export const deleteAvatar = (AvatarDefault) => async dispatch => {
  try {
    const response = await userService.deleteAvatar()

    dispatch(unsetAvatar(AvatarDefault))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export const updateSubscription = subscriptionUpdate => async dispatch => {
  try {
    const response = await userService.updateSubscription({ subscription: subscriptionUpdate })

    dispatch(setSubscription(response.data.user.subscription))

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export const deleteUser = () => async dispatch => {
  try {
    const response = await userService.deleteUser()

    if (response) {
      window.location.href = '/login';
    }

    dispatch(unsetUser())

    Notify.success(response.data.message);
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}
