import { v4 } from 'uuid'
import gravatar from 'gravatar'

import User from './models/userSchema.js'
import UserDto from '../dtos/userDto.js'
import sendVerifyMail from './mailService.js'
import tokenService from './tokenService.js'
import ApiError from '../exceptions/apiError.js'

const signup = async (email, password) => {
  const candidate = await User.findOne({ email })

  if (candidate) {
    throw ApiError.Conflict(`Email ${email} is already in use`)
  }

  const verifyToken = v4()
  const avatarURL = gravatar.url(email, { protocol: 'http', s: '200', d: 'mp' })

  const user = new User({ email, verifyToken, avatarURL })
  user.setPassword(password)
  const newUser = await user.save()

  const link = `${process.env.API_URL}/auth/verify/${verifyToken}`
  await sendVerifyMail(email, link)

  const userDto = new UserDto(newUser)
  return userDto
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    throw ApiError.BadRequest(`Email or password is wrong`)
  }

  if (!user.verified) {
    throw ApiError.Unauthorized(`Email is not yet verified`)
  }

  const userDto = new UserDto(user)

  const payload = { ...userDto };
  const tokens = tokenService.generate(payload)

  await tokenService.save(user._id, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

const logout = async (userId) => {
  return await tokenService.remove(userId)
}

const current = async (userId) => {
  const user = await User.findById(userId)

  const userDto = new UserDto(user)

  const payload = { ...userDto };
  const tokens = tokenService.generate(payload)
  await tokenService.save(user._id, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

const verify = async (verifyToken) => {
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  user.verifyToken = null
  user.verified = true

  return await user.save()
}

const resend = async (email) => {
  const user = await User.findOne({ email })
  const { verified, verifyToken } = user

  if (verified) {
    throw ApiError.BadRequest('Verification has already been passed')
  }

  const link = `${process.env.API_URL}/auth/verify/${verifyToken}`

  return await sendVerifyMail(email, link)
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.Unauthorized('Нет рефреш-токена в куках')
  }
  // Передаю токен как обьект, чтобы по ключу определить каким секретом пользоваться для валидации
  const userDataFromToken = tokenService.validate({ refreshToken })
  const tokenDataFromDB = await tokenService.search(refreshToken)
  // Проверка что и валидация, и поиск в БД прошли успешно
  if (!userDataFromToken || !tokenDataFromDB) {
    throw ApiError.Unauthorized('Валидация / поиск токена в БД прошли неуспешно')
  }
  // Вытащим из БД "свежего" пользователя, т.к. за 60 дней мог "устареть"
  const user = await User.findById(userDataFromToken.id)
  const userDto = new UserDto(user)

  const payload = { ...userDto };
  const tokens = tokenService.generate(payload)
  await tokenService.save(user.id, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

export default {
  signup,
  login,
  logout,
  current,
  verify,
  resend,
  refresh
}