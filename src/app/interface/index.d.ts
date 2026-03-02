import { TJwtPayload } from '../../modules/Auth/auth.utils'
declare global {
  namespace Express {
    interface Request {
      user: TJwtPayload
    }
  }
}
