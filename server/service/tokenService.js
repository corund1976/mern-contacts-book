import jwt from 'jsonwebtoken'

import Token from './models/tokenSchema.js'

const generate = (payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

  return { accessToken, refreshToken }
}

const save = async (ownerId, refreshToken) => {
  // ownerId =  new ObjectId("62d1b0e0bfde815a5f0690d8")
  const tokenFoundInDB = await Token.findOne({ ownerId })
  // Token.findOne(ownerId) = {
  //   _id: new ObjectId("62d55de24f476f467a56668e"),
  //   ownerId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ.....Y'
  // }
  if (!tokenFoundInDB) {
    const newTokenInDB = await Token.create({ ownerId, refreshToken })
    // newTokenInDB= {
    //   _id: new ObjectId("62d68b206b8f5394a062a7f7"),
    //   ownerId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
    //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ.....1SVdOg'
    // }
    return newTokenInDB
  }

  tokenFoundInDB.refreshToken = refreshToken
  const newTokenInDB = await tokenFoundInDB.save()
  // newTokenInDB= {
  //   _id: new ObjectId("62d68b206b8f5394a062a7f7"),
  //   ownerId: new ObjectId("62d1b0e0bfde815a5f0690d8"),
  //   refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ.....1SVdOg'
  // }
  return newTokenInDB
}

const remove = async (ownerId) => {
  const response = await Token.deleteOne({ ownerId })
  return response
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
  const tokenFoundInDB = await Token.findOne({ refreshToken })
  return tokenFoundInDB
}

export default {
  generate,
  save,
  remove,
  validate,
  search,
}