import { v4 } from 'uuid'

import Verification from "./models/verifySchema.js"

const generateToken = () => {
  const verifyToken = v4()
  return verifyToken
}

const saveToken = async (ownerId, verifyToken) => {
  const response = await Verification.create({ ownerId, verifyToken })
  // response = {
  //   ownerId: new ObjectId("62d6ab51ae9a3e0ca5eb5d34"),
  //   verifyToken: '5337c30f-e48d-4867-ad53-505c7ec4b7cb',
  //   _id: new ObjectId("62d6ab51ae9a3e0ca5eb5d36")
  // }
  return response
}

export default {
  generateToken,
  saveToken,
}