import mongoose from 'mongoose'
import bCrypt from 'bcryptjs'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      // required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: false },
)

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model('user', userSchema)

export default User