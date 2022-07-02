import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import User from '../service/models/userSchema.js'
import UserDto from '../dtos/userDto.js'

const passportConfig = (passport) => {
  const params = {
    secretOrKey: process.env.JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  passport.use(
    new JWTStrategy(params, function (payload, done) {
      User.find({ _id: payload.id })
        .then(([user]) => {
          if (!user) {
            return done(new Error('User not found'));
          }
          const userDto = new UserDto(user)
          return done(null, { ...userDto })
        })
        .catch(err => done(err))
    }),
  )
}

export default passportConfig