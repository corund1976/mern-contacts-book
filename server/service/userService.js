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

const remove = async (id) => {
  const result = await User.findByIdAndDelete(id)
  // result = {
  //   _id: new ObjectId("62d3e4e7487d2ee8063dc48b"),
  //   email: 'test2@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://www.gravatar.com/avatar/2f3a78daf1cfe00021345df4160d7f34?s=200&d=mp',
  //   role: 'user',
  //   verified: true,
  //   verifyToken: '5aedc7fb-fcb2-45cb-a8d2-12ecfb931732',
  //   password: '$2a$06$lrA12YK2pC2Eb0.9Aa4aqOYN.NkdVoy8nUWmWDSxbia4eU7tCWYmG'
  // }
  if (!result) throw ApiError.NotFound('User not found in DB')

  const response = await tokenService.remove(id)  // response = { acknowledged: true, deletedCount: 1 }
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

// const remove = async (id) => {
//   await tokenService.remove(id)  // response = { acknowledged: true, deletedCount: 1 }
//   return await User.findByIdAndDelete(id)
// }
