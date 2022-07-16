import tokenService from '../service/tokenService.js'
import User from '../service/models/userSchema.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
// version without using passport
const auth = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if (!authHeader) {
      return next(ApiError.Unauthorized('Not found authorization Header in request'))
    }

    const accessToken =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.replace('Bearer ', '') // authHeader.split('')[1] 
        : null

    if (!accessToken) {
      return next(ApiError.Unauthorized('Not found accessToken in authHeader'))
    }
    // Передаю токен как обьект, чтобы по ключу определить каким секретом пользоваться для валидации
    const userData = await tokenService.validate({ accessToken })

    if (!userData) {
      return next(ApiError.Unauthorized('Token is not valid'))
    }

    const user = await User.findOne({ _id: userData.id })
    const userDto = new UserDto(user)

    req.user = { ...userDto }
    // req.user = {
    //   id: new ObjectId("62bdb022846f8ca667342caa"),
    //   email: 'test@mail.ua',
    //   subscription: 'pro',
    //   avatarURL: 'http://localhost:5000/avatars/62bdb022846f8ca667342caa-20160225_171657.jpg',
    //   role: 'user',
    //   verified: true
    // }
    next()
  } catch (e) {
    next(e)
  }
}

export default auth 