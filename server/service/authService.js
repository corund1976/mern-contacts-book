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
  if (!userId) {
    throw ApiError.BadRequest('Токена нет или не прошел валидацию')
  }

  return await tokenService.remove(userId)
}

const refresh = async (refreshToken) => {
  console.log('1. Беру refreshToken из куки', refreshToken);
  // refreshToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg4ODExLCJleHAiOjE2NjA2ODA4MTF9.0gnnvkBVf_9bJkdN5AF6A4FtRqmFEgFegLI0eoeiLcw
  if (!refreshToken) {
    throw ApiError.Unauthorized('Нет рефреш-токена в куках')
  }
  // Передаю токен как обьект, чтобы по ключу определить каким секретом пользоваться для валидации
  const userDataFromToken = tokenService.validate({ refreshToken })
  console.log('2. Делаю валидацию токена и извлекаю данные из токена userDataFromToken', userDataFromToken)
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
  const tokenDataFromDB = await tokenService.search(refreshToken)
  console.log('3.5. Выполняю поиск в базе Токенов tokenDataFromDB', tokenDataFromDB)
  // tokenDataFromDB = {
  //   _id: new ObjectId("62d4619f082ddb14e59288e9"),
  //   userId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg3MzQ0LCJleHAiOjE2NjA2NzkzNDR9.ucjzr1dpQLJ4cstVS1KKXSX2BXmvL0JlFVHJkCYasUo'
  // }

  // Вытащим из БД "свежего" пользователя, т.к. за 60 дней мог "устареть"
  const user = await User.findById(userDataFromToken.id)
  console.log('4. Беру в базе Юзеров по id user', user)
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
  console.log('5. Пропускаю через userDto', userDto);
  // userDto = UserDto = {
  //   id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true
  // }
  const payload = { ...userDto };
  console.log('6. И кладу в payload', payload);
  // payload = {
  //   id: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   email: 'test@mail.ua',
  //   subscription: 'business',
  //   avatarURL: 'http://localhost:5000/avatars/62d1b0e0bfde815a5f0690d8-P1050730.JPG',
  //   role: 'user',
  //   verified: true
  // }
  const tokens = tokenService.generate(payload)
  console.log('7. Генерирую новые tokens', tokens);
  // tokens = {
  //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg3OTY5LCJleHAiOjE2NTgwODg4Njl9.m8VGQS2LY7rwlhzTQj4xCsdSveUHbwc25-o455HnZOk',
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg3OTY5LCJleHAiOjE2NjA2Nzk5Njl9.0jmuDngIovTLrfg3QL4Hg9hECN1Lp2ypfuOUeKozmJY'
  // }
  const res = await tokenService.save(user._id, tokens.refreshToken)
  console.log('8.res', res);
  // res = {
  //   _id: new ObjectId("62d4691a6ccca72ea30b7b88"),
  //   userId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MDg4MDQyLCJleHAiOjE2NjA2ODAwNDJ9.YzB6v_HAZcT9jlHLg7b6h2MTrAa1WXCKVRfjMhus0dc'
  // }
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

export default {
  signup,
  login,
  logout,
  refresh,
  verify,
  resend,
}

// const current = async (userId) => {
//   const user = await User.findById(userId)

//   const userDto = new UserDto(user)

//   const payload = { ...userDto };
//   const tokens = tokenService.generate(payload)
//   await tokenService.save(user._id, tokens.refreshToken)

//   return { ...tokens, user: userDto }
// }

