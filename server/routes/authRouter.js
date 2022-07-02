import { Router } from 'express'

import auth from '../middlewares/authMiddleware.js'
import { validateUser } from '../middlewares/validateMiddleware.js'
import authCtrl from '../controllers/authController.js'

const router = Router()

router.post('/signup', validateUser, authCtrl.signup) // public route
router.post('/login', validateUser, authCtrl.login) // public route
router.get('/logout', auth, authCtrl.logout) // all authenticated users
router.get('/verify/:verifyToken', authCtrl.verify) // public route
router.post('/verify', validateUser, authCtrl.resend) // public route
router.get('/refresh', auth, authCtrl.refresh) // all authenticated users

export { router }