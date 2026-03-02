import { Router } from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../app/middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../app/middleware/auth'

const router = Router()

router.get('/get-me', auth('admin', 'user'), UserController.getMe)

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getSingleUser)
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUser,
)
router.delete('/:id', UserController.deleteUser)
router.patch('/role/:id', UserController.updateUserRole)
router.post('/track/:id', UserController.trackProfileEvent)

export const UserRoute = router
