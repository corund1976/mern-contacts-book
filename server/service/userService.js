import User from './models/userSchema.js'

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

const remove = async (id) => {
  await User.findByIdAndDelete(id)
  const response = await tokenService.remove(id)
  const { deletedCount } = response

  if (!deletedCount) throw ApiError.NotFound('Token not found in DB')

  return deletedCount
}

export default {
  listUsers,
  getById,
  update,
  remove,
}
