import { Router } from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { PortfolioController } from './portfolio.controller'
import { PortfolioValidation } from './portfolio.validation'
import auth from '../../app/middleware/auth'

const router = Router()

router.post(
  '/create-portfolio',
  auth('user'),
  validateRequest(PortfolioValidation.createPortfolioValidationSchema),
  PortfolioController.createPortfolio,
)

router.get('/', PortfolioController.getAllPortfolios)

router.get('/:id', PortfolioController.getSinglePortfolio)

router.patch(
  '/:id',
  auth('user'),
  validateRequest(PortfolioValidation.updatePortfolioValidationSchema),
  PortfolioController.updatePortfolio,
)

router.delete('/:id', auth('user'), PortfolioController.deletePortfolio)

export const PortfolioRoutes = router
