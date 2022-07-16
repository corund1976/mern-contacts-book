import { $api } from '../http';

const uploadAvatar = (formData) => {
  const result = $api.patch('/users/avatars', formData)
  return result
}

const deleteAvatar = () => {
  const result = $api.delete('/users/avatars')
  return result
}

const updateSubscription = (subscription) => {
  const result = $api.patch('/users/subscription', subscription)
  return result
}

const deleteUser = () => {
  const result = $api.delete('/users')
  return result
}

const userService = {
  uploadAvatar, deleteAvatar, updateSubscription, deleteUser
}

export default userService