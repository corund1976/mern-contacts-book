const getCurrentUser = (state) => state.user
const getEmail = (state) => state.user.email
const getSubscription = (state) => state.user.subscription
const getAvatarUrl = (state) => state.user.avatarURL

export default { getCurrentUser, getEmail, getSubscription, getAvatarUrl }