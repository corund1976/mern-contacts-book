import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan'
import passport from 'passport'

import passportConfig from './config/config-passport.js'
import { authRouter, userRouter, contactRouter } from './routes/index.js'
import errorMiddlware from './middlewares/errorMiddlware.js'

const app = express()

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json()) // express.json({ extended: true })
app.use(cookieParser())
app.use(cors())

const formatsLogger =
  app.get('env') === 'development'
    ? 'dev'
    : 'short'
app.use(morgan(formatsLogger))

passportConfig(passport)
app.use(passport.initialize());

app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'))
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/contacts', contactRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: '🚫 Page not found' })
  next({ status: 404 });
});
// error handler
app.use(errorMiddlware)

export default app