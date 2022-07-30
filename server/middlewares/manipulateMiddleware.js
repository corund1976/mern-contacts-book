import Jimp from 'jimp';
import path from 'path'
import fs from 'fs/promises';

import ApiError from '../exceptions/apiError.js'

const storeDir = path.join(process.cwd(), 'public/avatars');

const createFolderIsNotExist = async folder => {
  fs
    .stat(folder)
    .catch(async (err) => {
      if (err.message.includes('no such file or directory')) {
        await fs.mkdir(folder);
      }
    })
}

createFolderIsNotExist(storeDir);

const manipulateImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw ApiError.BadRequest('Ошибка загрузки файла - возможно файл отсутствует')
    }

    const { filename, path: pathTempUploadedFile } = req.file;

    const filePath = path.join(storeDir, filename);

    const imageFile = await Jimp.read(pathTempUploadedFile)

    imageFile.resize(250, 250).quality(70).write(filePath);

    await fs.unlink(pathTempUploadedFile);

    next()
  } catch (e) {
    next(e)
  }
}

export default manipulateImage
