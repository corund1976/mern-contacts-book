import $api from '../http'

const updateAvatar = async (formData, onUploadProgress) => {
  const result = await $api.patch('/users/avatars', formData, { onUploadProgress })
  return result
}

const deleteAvatar = async () => {
  const result = await $api.delete('/users/avatars');
  return result
}

const updatePassword = async (credentials) => {
  const result = await $api.patch('/users/password', credentials);
  return result
}

const updateSubscription = async (subscription) => {
  const result = await $api.patch('/users/subscription', subscription);
  return result
}

const deleteUser = async () => {
  const result = await $api.delete('/users');
  return result
}

export default { updateAvatar, deleteAvatar, updatePassword, updateSubscription, deleteUser }