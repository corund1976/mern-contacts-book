import jwt from 'jsonwebtoken'

import Token from './models/tokenSchema.js'
import Verification from './models/verifySchema.js'
import ResetToken from './models/resetTokenSchema.js'

const generate = (tokenType, payload) => {
  switch (tokenType) {
    case 'accessToken':
      return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
    case 'refreshToken':
      return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    case 'verifyToken':
      return jwt.sign(
        payload,
        process.env.JWT_VERIFY_SECRET,
        { expiresIn: process.env.JWT_VERIFY_EXPIRES_IN });
    case 'resetToken':
      return jwt.sign(
        payload,
        process.env.JWT_RESET_SECRET,
        { expiresIn: process.env.JWT_RESET_EXPIRES_IN });
    default:
      break;
  }
  return
}

const validate = (token) => {
  let secret = ''

  const [tokenKey] = Object.keys(token)
  const [tokenValue] = Object.values(token)

  switch (tokenKey) {
    case "accessToken":
      secret = process.env.JWT_ACCESS_SECRET
      break;
    case "refreshToken":
      secret = process.env.JWT_REFRESH_SECRET
      break;
    case "verifyToken":
      secret = process.env.JWT_VERIFY_SECRET
      break;
    case "resetToken":
      secret = process.env.JWT_RESET_SECRET
      break;
    default:
      break;
  }

  try {
    const tokenData = jwt.verify(tokenValue, secret)
    return tokenData
  } catch (e) {
    return null
  }
}

const saveRefresh = async (ownerId, refreshToken) => {
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

const findRefresh = async (refreshToken) => {
  const tokenFoundInDB = await Token.findOne({ refreshToken })
  return tokenFoundInDB
}

const deleteRefresh = async (ownerId) => {
  const response = await Token.deleteOne({ ownerId })
  return response
}

const saveVerification = async (ownerId, verifyToken) => {
  const verification = await Verification.create({ ownerId, verifyToken })
  // verification = {
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36"),
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJl....xqh_s'
  // }
  return verification
}

const findVerification = async ({ searchParam }) => {
  const verification = await Verification.findOne({ searchParam })
  // verification = {
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36"),
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJl....xqh_s'
  // }
  return verification
}

const deleteVerification = async (id) => {
  const verification = await Verification.findByIdAndDelete(id)
  // verification = {
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36"),
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJl....xqh_s'
  // }
  return verification
}

const saveReset = async (ownerId, resetToken) => {
  const reset = await ResetToken.create({ ownerId, resetToken })
  // reset = {
  //   _id: new ObjectId("62d9bb82c81426bda867719d")  
  //   ownerId: new ObjectId("62d964e9e9461c17df990070"),
  //   resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnVuZDE5NzZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NTg0MzY0ODIsImV4cCI6MTY1ODQzNzM4Mn0.IyB7FtUcgLVyMEf5rA0Bpi3vmtEfzKRoSXl6N91Uhpg',
  // }
  return reset
}

const findReset = async (resetToken) => {
  const reset = await ResetToken.findOne({ resetToken })
  // reset = {
  //   _id: new ObjectId("62d9bb82c81426bda867719d")  
  //   ownerId: new ObjectId("62d964e9e9461c17df990070"),
  //   resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvcnVuZDE5NzZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NTg0MzY0ODIsImV4cCI6MTY1ODQzNzM4Mn0.IyB7FtUcgLVyMEf5rA0Bpi3vmtEfzKRoSXl6N91Uhpg',
  // }
  return reset
}

const deleteReset = async (id) => {
  const reset = await ResetToken.findByIdAndDelete(id)
  return reset
}

export default {
  generate,
  validate,
  saveRefresh,
  findRefresh,
  deleteRefresh,
  saveVerification,
  findVerification,
  deleteVerification,
  saveReset,
  findReset,
  deleteReset,
}