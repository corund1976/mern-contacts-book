import { $api } from '../http'

const uploadAvatar = async (formData) => {
  const result = await $api.patch('/users/avatars', formData);
  return result
}

const deleteAvatar = async () => {
  const result = await $api.delete('/users/avatars');
  return result
}

const updateSubscription = async (subscription) => {
  const result = await $api.patch('/users/subscription', subscription);
  return result
};

const deleteUser = async () => {
  const result = await $api.delete('/users');
  return result
}

export default { uploadAvatar, deleteAvatar, updateSubscription, deleteUser }