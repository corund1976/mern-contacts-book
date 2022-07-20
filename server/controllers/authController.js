import authService from '../service/authService.js'

const signup = async (req, res, next) => {
  if (!('email' in req.body) || !('password' in req.body)) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing required fields *email* or *password*'
      })
  }

  const { email, password } = req.body

  try {
    const user = await authService.signup(email, password)

    if (user) {
      return res
        .status(201)
        .json({
          status: 'Created',
          code: 201,
          message: 'Signup successful',
          user,
        })
      // res.send({ user, redirectPath: "/login" });
    }
    // res.send('<h1>route = /auth/signup</h1>')
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  if (!('email' in req.body) || !('password' in req.body)) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing required fields *email* or *password*'
      })
  }

  const { email, password } = req.body

  try {
    const userData = await authService.login(email, password)

    const { refreshToken, accessToken, user } = userData

    res.cookie(
      'refreshToken',
      refreshToken,
      { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Login successfull',
        accessToken,
        user
        // user = {
        //   id: "62cf18a2defbc4941cbd50f6",
        //   email: "test7@mail.ua",
        //   subscription: "starter",
        //   avatarURL: "http://localhost:5000/avatars/62cf18a2defbc4941cbd50f6-3240d8c8d5b323a6965585f8d4422260.jpeg",
        //   role: "user",
        //   verified: true }
      })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  const { id } = req.user

  try {
    await authService.logout(id)
    res.clearCookie('refreshToken')

    return res
      .status(204)
      .send()
  } catch (e) {
    next(e)
  }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.cookies
    const userData = await authService.refresh(token)

    const { refreshToken, accessToken, user } = userData

    res.cookie(
      'refreshToken',
      refreshToken,
      { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
    )

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Refresh successfull',
        accessToken,
        user
      })
  } catch (e) {
    next(e)
  }
}

const verify = async (req, res, next) => {
  const { verifyToken } = req.params

  try {
    const response = await authService.verify(verifyToken)

    if (response) {
      return res.redirect(process.env.CLIENT_URL)
      // return res
      //   .status(200)
      //   .json({
      //     status: 'Ok',
      //     code: 200,
      //     message: 'Verification successful'
      //   })
    }
  } catch (e) {
    next(e)
  }
}

const resend = async (req, res, next) => {
  // Получает body в формате { email }
  // Если в body нет обязательного поля email, возвращает json с ключом 
  // { 'message': 'missing required field email' } и статусом 400
  // Если с body все хорошо, выполняем повторную отправку письма с verificationToken 
  // на указанный email, но только если пользователь не верифицирован
  // Если пользователь уже прошел верификацию отправить json с ключом 
  // { message: 'Verification has already been passed' } со статусом 400 Bad Request
  if (!('email' in req.body)) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing required field *email* '
      })
  }

  try {
    const { email } = req.body

    const sendResult = await authService.resend(email)

    return res
      .status(200)
      .json({
        status: 'ok',
        code: 200,
        message: 'Verification email sent',
        sendResult
      })
  } catch (e) {
    next(e)
  }
}

export default {
  signup,
  login,
  logout,
  refresh,
  verify,
  resend,
}