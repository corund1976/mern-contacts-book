import mongoose from 'mongoose'

const { Schema, SchemaTypes, model } = mongoose

const tokenSchema = new Schema(
  {
    userId: {
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

const Token = model('token', tokenSchema)

export default Token
