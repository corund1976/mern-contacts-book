import gravatar from 'gravatar'

import User from './models/userSchema.js'
import UserDto from '../dtos/userDto.js'
import sendVerifyMail from './mailService.js'
import tokenService from './tokenService.js'
import verifyService from './verifyService.js'
import ApiError from '../exceptions/apiError.js'
import Verification from './models/verifySchema.js'

const signup = async (email, password) => {
  const candidate = await User.findOne({ email })

  if (candidate) {
    throw ApiError.Conflict(`Email ${email} is already in use`)
  }

  const avatarURL = gravatar.url(email, { protocol: 'http', s: '200', d: 'mp' })

  const user = new User({ email, avatarURL })
  user.setPassword(password)
  const newUser = await user.save()

  const verifyToken = verifyService.generateToken()
  await verifyService.saveToken(newUser._id, verifyToken)

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
  if (!userId) {
    throw ApiError.BadRequest('Токена нет или не прошел валидацию')
  }

  const response = await tokenService.remove(userId)

  return response
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.Unauthorized('Not authorized. No refresh token in cookie')
  }
  // Передаю токен как обьект, чтобы по ключу определить каким секретом пользоваться для валидации
  const userDataFromToken = tokenService.validate({ refreshToken })
  // userDataFromToken = {
  //   id: '62d1b0e0bfde815a5f0690d8',
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true,
  //   iat: 1658087344,
  //   exp: 1660679344
  // }
  if (!userDataFromToken) {
    throw ApiError.Unauthorized('Not authorized. Refresh token is not valid')
  }

  const tokenFoundInDB = await tokenService.search(refreshToken)
  // tokenDataFromDB = {
  //   _id: new ObjectId("62d4619f082ddb14e59288e9"),
  //   ownerId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg3MzQ0LCJleHAiOjE2NjA2NzkzNDR9.ucjzr1dpQLJ4cstVS1KKXSX2BXmvL0JlFVHJkCYasUo'
  // }
  if (!tokenFoundInDB) {
    throw ApiError.Unauthorized('Not authorized. Refresh token not found in DB')
  }

  // Вытащим из БД "свежего" пользователя, т.к. за 60 дней мог "устареть"
  const user = await User.findById(userDataFromToken.id)
  // user = {
  //   _id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true,
  //   verifyToken: null,
  //   password: '$2a$06$eJ9MQKVebli4l.tE9xTL7.bA2sFNjsoSYxFlpsd7sgnOz/iCbrbP6'
  // }

  const userDto = new UserDto(user)
  // userDto = UserDto = {
  //   id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true
  // }

  const payload = { ...userDto }
  // payload = {
  //   id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true
  // }

  const tokens = tokenService.generate(payload)
  // tokens = {
  //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp....nZOk',
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZu...KozmJY'
  // }

  await tokenService.save(user._id, tokens.refreshToken)
  // {
  //   _id: new ObjectId("62d4691a6ccca72ea30b7b88"),
  //   ownerId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoi...us0dc'
  // }
  return { ...tokens, user: { ...userDto } }
}

const verify = async (verifyToken) => {
  const verification = await Verification.findOneAndDelete({ verifyToken })
  // verification = {
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36"),
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: '5337c30f-e48d-4867-ad53-505c7ec4b7cb'
  // }
  if (!verification) {
    throw ApiError.NotFound('Verification token not found in DB')
  }

  const { ownerId } = verification

  const user = await User.findByIdAndUpdate(
    ownerId,
    { verified: true },
    { new: true }
  )
  // user = {
  //   _id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true,
  //   password: '$2a$06$eJ9MQKVebli4l.tE9xTL7.bA2sFNjsoSYxFlpsd7sgnOz/iCbrbP6'
  // }
  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  return user
}

const resend = async (email) => {
  const user = await User.findOne({ email })
  // user = {
  //   _id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true,
  //   password: '$2a$06$eJ9MQKVebli4l.tE9xTL7.bA2sFNjsoSYxFlpsd7sgnOz/iCbrbP6'
  // }
  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  const { _id, verified } = user

  if (verified) {
    throw ApiError.BadRequest(`Verification for ${email} has already been passed`)
  }

  const verification = await Verification.findOne({ ownerId: _id })
  // verification = {
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36"),
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: '5337c30f-e48d-4867-ad53-505c7ec4b7cb'
  // }
  if (!verification) {
    throw ApiError.NotFound('Verification token not found in DB')
  }

  const { verifyToken } = verification
  const link = `${process.env.API_URL}/auth/verify/${verifyToken}`

  await sendVerifyMail(email, link)
  return
}

export default {
  signup,
  login,
  logout,
  refresh,
  verify,
  resend,
}

