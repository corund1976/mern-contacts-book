import ApiError from '../exceptions/apiError.js'
import User from './models/userSchema.js'
import tokenService from './tokenService.js'

const listUsers = async () => {
  return await User.find()
}

const getById = async (id) => {
  return await User.findById(id)
}

const update = async (id, update) => {
  return await User.findByIdAndUpdate(
    id,
    update,
    { new: true })
}

const changePassword = async (id, credentials) => {
  const { password, newPassword } = credentials

  const user = await User.findById(id)

  if (!user || !user.validPassword(password)) {
    throw ApiError.BadRequest(`Current password is wrong // User with Current password not exist `)
  }

  user.setPassword(newPassword)

  const updatedUser = await user.save()

  return updatedUser
}

const remove = async (id) => {
  const result = await User.findByIdAndDelete(id)

  if (!result) throw ApiError.NotFound('User not found in DB')

  const response = await tokenService.deleteRefresh(id)
  const { deletedCount } = response

  if (!deletedCount) throw ApiError.NotFound('Token not found in DB')

  return deletedCount
}

export default {
  listUsers,
  getById,
  update,
  changePassword,
  remove,
}
