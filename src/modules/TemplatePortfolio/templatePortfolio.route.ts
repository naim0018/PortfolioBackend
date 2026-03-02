import { Router } from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import auth from '../../app/middleware/auth'
import { TemplateController } from './templatePortfolio.controller'
import { TemplateValidation } from './templatePortfolio.validation'

const router = Router()

router.post(
  '/',
  auth('admin'),
  validateRequest(TemplateValidation.createTemplateValidationSchema),
  TemplateController.createTemplate,
)

router.get('/', TemplateController.getAllTemplates)

router.get('/:id', TemplateController.getSingleTemplate)

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(TemplateValidation.updateTemplateValidationSchema),
  TemplateController.updateTemplate,
)

router.delete('/:id', auth('admin'), TemplateController.deleteTemplate)

export const TemplateRoutes = router
