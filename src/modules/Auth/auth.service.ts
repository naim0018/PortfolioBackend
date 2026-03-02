import { UserModel } from '../User/user.model'
import bcrypt from 'bcrypt'
import config from '../../app/config'
import { createToken, TJwtPayload, verifyToken } from './auth.utils'
import { IUser } from '../User/user.interface'

const loginUser = async (payload: any) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  )

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.password) {
    throw new Error('User password missing')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new Error('Password mismatch')
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
    userName: user.name,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  const userObj = user.toObject()
  delete (userObj as any).password

  return {
    accessToken,
    refreshToken,
    user: userObj,
  }
}

const signupUser = async (payload: IUser) => {
  const newUser = await UserModel.create(payload)

  const jwtPayload = {
    id: newUser._id.toString(),
    role: newUser.role,
    email: newUser.email,
    userName: newUser.name,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  const userObj = newUser.toObject()
  delete (userObj as any).password

  return {
    accessToken,
    refreshToken,
    user: userObj,
  }
}

const refreshToken = async (token: string) => {
  // Verify token
  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string,
  ) as TJwtPayload

  const user = await UserModel.findById(decoded.id)
  if (!user) {
    throw new Error('User not found')
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
    userName: user.name,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

export const AuthService = {
  loginUser,
  signupUser,
  refreshToken,
}
