import { Router } from 'express'
import { AuthRoute } from '../../modules/Auth/auth.route'

const router = Router()

const moduleRoute = [
  {
    path: '/',
    route: AuthRoute,
  },
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router
