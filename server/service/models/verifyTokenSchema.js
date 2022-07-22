import mongoose from 'mongoose'

const { Schema, SchemaTypes, model } = mongoose

const verifyTokenSchema = new Schema(
  {
    ownerId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    verifyToken: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: false },
)

const VerifyToken = model('verifyToken', verifyTokenSchema)

export default VerifyToken
