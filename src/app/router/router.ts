import { Router } from 'express'
import { AuthRoute } from '../../modules/Auth/auth.route'
import { PortfolioRoutes } from '../../modules/Portfolio/portfolio.route'
import { TemplateRoutes } from '../../modules/TemplatePortfolio/templatePortfolio.route'
import { UserRoute } from '../../modules/User/user.route'

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
  {
    path: '/template-portfolio',
    route: TemplateRoutes,
  },
  {
    path: '/user',
    route: UserRoute,
  },
]

moduleRoute.forEach((route) => router.use(route.path, route.route))

export default router
