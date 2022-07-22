import mongoose from 'mongoose'

const { Schema, SchemaTypes, model } = mongoose

const resetTokenSchema = new Schema(
  {
    ownerId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    resetToken: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: false },
)

const ResetToken = model('resetToken', resetTokenSchema)

export default ResetToken
