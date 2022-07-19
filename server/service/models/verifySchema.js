import mongoose from 'mongoose'

const { Schema, SchemaTypes, model } = mongoose

const verifySchema = new Schema(
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

const Verification = model('verification', verifySchema)

export default Verification
