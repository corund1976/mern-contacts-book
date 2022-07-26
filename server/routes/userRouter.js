import { Router } from 'express'

import auth from '../middlewares/authMiddleware.js'
import authorizeAdmin from '../middlewares/authorizeMiddleware.js'
import { validateUser, validateId } from '../middlewares/validateMiddleware.js'
import uploadImage from '../middlewares/uploadMiddleware.js'
import manipulateImage from '../middlewares/manipulateMiddleware.js'
import userCtrl from '../controllers/userController.js'

const router = Router()

router.get('/', auth, authorizeAdmin, userCtrl.getAll) // admin only
router.get('/:id', auth, authorizeAdmin, validateId, userCtrl.getById) // admin only
router.patch('/subscription', auth, validateUser, userCtrl.updateSubscription) // all authenticated users
router.patch('/avatars', auth, uploadImage, manipulateImage, userCtrl.updateAvatar) // all authenticated users
router.patch('/password', auth, userCtrl.changePassword) // all authenticated users
router.patch('/:id', auth, authorizeAdmin, validateUser, userCtrl.update) // admin only
router.delete('/', auth, validateUser, userCtrl.remove) // all authenticated users
router.delete('/avatars', auth, userCtrl.deleteAvatar) // all authenticated users
router.delete('/:id', auth, authorizeAdmin, validateUser, userCtrl.remove) // admin only

export { router }