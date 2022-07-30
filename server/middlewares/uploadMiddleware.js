import multer from 'multer'
import path from 'path'
import fs from 'fs/promises';

import ApiError from '../exceptions/apiError.js'

const uploadDir = path.join(process.cwd(), 'tmp')

const createFolderIsNotExist = async folder => {
  fs
    .stat(folder)
    .catch(async (err) => {
      if (err.message.includes('no such file or directory')) {
        await fs.mkdir(folder)
      }
    })
}

createFolderIsNotExist(uploadDir);

const uploadImage = (req, res, next) => {

  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      cb(null, req.user.id + '-' + file.originalname);
    },
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  })

  const myFileFilter = (req, file, cb) => {
    const types = ['image/png', 'image/jpeg', 'image/jpg']

    if (types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Тип файла не соответствует image')
      cb(err)
    }
  }

  const upload = multer({
    storage: diskStorage,
    fileFilter: myFileFilter,
  }).single('avatar')

  upload(req, res, function (err) {
    if (err) next(ApiError.BadRequest(err.message))

    next()
  })
}

export default uploadImage