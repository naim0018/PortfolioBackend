import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
export type TJwtPayload = {
  id: string
  role: string
  email: string
  userName: string
}
export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  })
}
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload
}
