import tokenService from '../service/tokenService.js'
import User from '../service/models/userSchema.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
// version without using passport
const authenticateToken = async (req, res, next) => {
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
    const userData = tokenService.validate({ accessToken })

    if (!userData) {
      return next(ApiError.Unauthorized('Token is not valid'))
    }

    const user = User.find({ _id: userData.id })
    const userDto = new UserDto(user)

    res.user = { ...userDto }
    next()
  } catch (e) {
    next(e)
  }
}

export { authenticateToken } 