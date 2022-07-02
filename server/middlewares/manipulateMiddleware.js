import Jimp from 'jimp';
import path from 'path'
import fs from 'fs/promises';

import ApiError from '../exceptions/apiError.js'

const storeDir = path.join(process.cwd(), 'public/avatars'); // задаем путь для папки для хранения обработанных аватарок

const createFolderIsNotExist = async folder => { // Вспомогат.функция создания такой папки, если она еще не существует
  fs
    .stat(folder) // проверка существует ли уже такая папка
    .catch(async (err) => {
      if (err.message.includes('no such file or directory')) {
        await fs.mkdir(folder); //создание такой папки, если она еще не существует
      }
    })
}

createFolderIsNotExist(storeDir); // Создаем папку для хранения обработанных аватарок

const manipulateImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw ApiError.BadRequest('Ошибка загрузки файла - возможно файл отсутствует')
    }
    // req.file = {
    //   fieldname: 'avatar',
    //   originalname: 'myAvatar.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   destination: 'C:\\Projects\\mern\\server\\tmp',
    //   filename: '62bdb022846f8ca667342caa-myAvatar.jpg',
    //   path: 'C:\\Projects\\mern\\server\\tmp\\62bdb022846f8ca667342caa-myAvatar.jpg',
    //   size: 175590
    // }
    const { filename, path: pathTempUploadedFile } = req.file;
    const filePath = path.join(storeDir, filename); // C:\Projects\mern\server\public\avatars\62bdb022846f8ca667342caa-Фото Резюме 1_1.jpg

    const imageFile = await Jimp.read(pathTempUploadedFile)
    imageFile.resize(250, 250).quality(70).write(filePath); // resize, reduce & save to new folder

    await fs.unlink(pathTempUploadedFile); // удаляю загруженный файл из временной папки

    next()
  } catch (e) {
    next(e)
  }
}

export default manipulateImage
