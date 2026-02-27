import { Router } from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { PortfolioController } from './portfolio.controller'
import { PortfolioValidation } from './portfolio.validation'

const router = Router()

router.post(
  '/create-portfolio',
  validateRequest(PortfolioValidation.createPortfolioValidationSchema),
  PortfolioController.createPortfolio,
)

router.get('/', PortfolioController.getAllPortfolios)

router.get('/:id', PortfolioController.getSinglePortfolio)

router.patch(
  '/:id',
  validateRequest(PortfolioValidation.updatePortfolioValidationSchema),
  PortfolioController.updatePortfolio,
)

router.delete('/:id', PortfolioController.deletePortfolio)

export const PortfolioRoutes = router
