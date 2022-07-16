import jwt from 'jsonwebtoken'

import Token from './models/tokenSchema.js';

const generate = (payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' });

  return { accessToken, refreshToken }
}

const save = async (userId, refreshToken) => {
  const user = await Token.findOne({ userId })

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

    return tokenData
  } catch (e) {
    return null
  }
}

const search = async (refreshToken) => {
  return await Token.findOne({ refreshToken })
}

export default {
  generate,
  save,
  remove,
  validate,
  search
}