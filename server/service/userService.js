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
  return await User.findByIdAndDelete(id)
}

export default {
  listUsers,
  getById,
  update,
  remove,
}