import mongoose from 'mongoose'

const { Schema, SchemaTypes, model } = mongoose

const refreshTokenSchema = new Schema(
  {
    ownerId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    refreshToken: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: false },
)

const RefreshToken = model('refreshToken', refreshTokenSchema)

export default RefreshToken
