import jwt from 'jsonwebtoken'

import Token from './models/tokenSchema.js'
import ApiError from '../exceptions/apiError.js';

const generate = (payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15s' });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' });
  return { accessToken, refreshToken }
}

const save = async (userId, refreshToken) => {
  const user = await Token.findOne({ userId })
  console.log('token service save user', user);
  if (!user) {
    return await Token.create({ userId, refreshToken })
  }

  user.refreshToken = refreshToken
  return await user.save()
}

const remove = async (userId) => {
  return await Token.deleteOne({ userId })
}

const validate = (token) => {
  const secret =
    ('accessToken' in token)
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET

  const [tokenValue] = Object.values(token)

  try {
    const tokenData = jwt.verify(tokenValue, secret)

    if (!tokenData) {
      throw ApiError.Unauthorized('Токен не валидный')
    }

    return tokenData
  } catch (e) {
    return null
  }
}

const search = async (refreshToken) => {
  const result = await Token.findOne({ refreshToken })

  if (!result) {
    throw ApiError.Unauthorized('Поиск токена в БД неуспешный')
  }

  return result
}

export default {
  generate,
  save,
  remove,
  validate,
  search
}