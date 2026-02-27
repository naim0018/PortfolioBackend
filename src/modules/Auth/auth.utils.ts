import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
type TJwtPayload = {
  userId: string
  role: string
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
