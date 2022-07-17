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

const remove = async (id) => {
  await tokenService.remove(id)  // response = { acknowledged: true, deletedCount: 1 }
  return await User.findByIdAndDelete(id)
}

export default {
  listUsers,
  getById,
  update,
  remove,
}
