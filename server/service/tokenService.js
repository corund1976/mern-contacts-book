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
  console.log('7.4. userId = ', userId)
  // userId =  new ObjectId("62d1b0e0bfde815a5f0690d8")

  // ВОТ ОНА ПРОБЛЕмНАЯ СТРОКА !!!!!!!!!!! ВНИЗУ !!!
  // const user = await Token.findOne({ userId })

  const response = await Token.findOne({ userId })

  console.log('7.5. Token.findOne({ userId }) = ', response)
  // Token.findOne(userId) = {
  //   _id: new ObjectId("62d55de24f476f467a56668e"),
  //   userId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDFiMGUwYmZkZTgxNWE1ZjA2OTBkOCIsImVtYWlsIjoidGVzdEBtYWlsLnVhIiwic3Vic2NyaXB0aW9uIjoiYnVzaW5lc3MiLCJhdmF0YXJVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvYXZhdGFycy82MmQxYjBlMGJmZGU4MTVhNWYwNjkwZDgtUDEwNTA3MzAuSlBHIiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjU4MTUwNjk2LCJleHAiOjE2NjA3NDI2OTZ9.uuY0jFDmslu5woDZerF_rdWMCGVkYdvjnY3bkcmMIeY'
  // }
  if (!response) {
    console.log('почему то захожу сюда и делаю новую запись');
    return await Token.create({ userId, refreshToken })
  }
  // user.refreshToken = refreshToken
  // const res = await user.save()
  const res = await Token.findOneAndUpdate(
    { userId },
    { refreshToken },
    { new: true }
  )
  console.log('7.6. Сохраняю в базу новый токен', res);
  return res
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
  console.log('3.1. ИЩУ В БАЗЕ ТОКЕН', refreshToken);

  const result = await Token.findOne({ refreshToken })
  console.log("3.2. И НАХОЖУ", result);

  const res = await Token.find()
  console.log("3.3. А вообще там есть", res);

  // if (!result) {
  //   throw ApiError.Unauthorized('Поиск токена в БД неуспешный')
  // }

  return result
}

export default {
  generate,
  save,
  remove,
  validate,
  search
}