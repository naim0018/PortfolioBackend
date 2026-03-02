import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import config from '../config'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import { TJwtPayload } from '../../modules/Auth/auth.utils'

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
    }

    try {
      const decoded = jwt.verify(
        token.replace('Bearer ', ''),
        config.jwt_access_secret as string,
      ) as TJwtPayload

      const { role } = decoded

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
      }

      req.user = decoded

      next()
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token')
    }
  })
}

export default auth
