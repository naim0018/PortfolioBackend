import { Router } from 'express'
import { AuthRoute } from '../../modules/Auth/auth.route'
import { PortfolioRoutes } from '../../modules/Portfolio/portfolio.route'

const router = Router()

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/portfolio',
    route: PortfolioRoutes,
  },
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router
