import userService from '../service/userService.js'
import UserDto from '../dtos/userDto.js'

const getAll = async (req, res, next) => {
  try {
    const listAllUsers = await userService.listUsers()

    if (listAllUsers) {
      return res
        .status(200)
        .json({
          status: 'ok',
          code: 200,
          message: 'Successful get List all user',
          users: [...listAllUsers]
        })
    }
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params

  try {
    const userById = await userService.getById(id)

    if (!userById) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${id}`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Successful get User by Id',
        userById
      })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  if (Object.keys(req.body) == 0) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing fields',
      })
  }

  try {
    const updatedUser = await userService.update(req.params.id, req.body)

    if (!updatedUser) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${id}`,
        })
    }

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Update user uccessful',
        updatedUser
      })
  } catch (e) {
    next(e)
  }
}

const updateSubscription = async (req, res, next) => {
  if (!('subscription' in req.body) // (Object.keys(req.body) != 'subscription')
    || Object.keys(req.body).length > 1) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing field *Subscription* / Another fields not allowed',
      })
  }

  try {
    const userData = await userService.update(req.user.id, req.body)

    if (userData) {
      const user = new UserDto(userData)

      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          message: 'Update ~Subscription~ user successful',
          user
        })
    }
  } catch (e) {
    next(e)
  }
}

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const { filename } = req.file
  // req.file = {
  //   fieldname: 'avatar',
  //   originalname: 'Фото Резюме 1_1.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'C:\\Projects\\express-mongoose-server\\tmp',
  //   filename: '62bdb022846f8ca667342caa-Фото Резюме 1_1.jpg',
  //   path: 'C:\\Projects\\express-mongoose-server\\tmp\\Фото Резюме 1_1.jpg',
  //   size: 171399
  // }
  const avatarURL = `${process.env.API_URL}/avatars/${filename}` // путь к файлу и папке на сервере !

  try {
    const userData = await userService.update(id, { avatarURL })

    if (userData) {
      const user = new UserDto(userData)
      return res
        .status(200)
        .json({
          status: 'Ok',
          code: 200,
          message: 'Update ~Avatar~ user successful',
          user
        })
    }
  } catch (e) {
    next(e)
  }
}

const deleteAvatar = async (req, res, next) => {
  const { id } = req.user

  try {
    const userData = await userService.update(id, { avatarURL: null })

    if (userData) {
      const user = new UserDto(userData)
      return res
        .status(200)
        .json({
          status: 'ok',
          code: 200,
          message: 'Delete ~Avatar~ user successful',
          user
        })
    }
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.user.id

  try {
    const result = await userService.remove(id)

    if (!result) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found user id: ${id}`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: `Delete user id: ${id} successful`
      })
  } catch (e) {
    next(e)
  }
}

export default {
  getAll,
  getById,
  update,
  updateSubscription,
  updateAvatar,
  deleteAvatar,
  remove,
}