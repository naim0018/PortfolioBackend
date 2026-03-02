import { Router } from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
import { UserValidation } from '../User/user.validation'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthController.signupUser,
)

router.post('/refresh-token', AuthController.refreshToken)

export const AuthRoute = router
