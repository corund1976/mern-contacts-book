const getCurrentUser = (state) => state.user.currentUser
const getEmail = (state) => state.user.currentUser.email
const getSubscription = (state) => state.user.currentUser.subscription
const getAvatarUrl = (state) => state.user.currentUser.avatarURL

export default { getCurrentUser, getEmail, getSubscription, getAvatarUrl }