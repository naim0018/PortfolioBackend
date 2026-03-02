import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../app/utils/catchAsync'
import sendResponse from '../../app/utils/sendResponse'
import { TemplateService } from './templatePortfolio.service'

const createTemplate = catchAsync(async (req: Request, res: Response) => {
  const result = await TemplateService.createTemplateIntoDB(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Template created successfully',
    data: result,
  })
})

const getAllTemplates = catchAsync(async (req: Request, res: Response) => {
  const result = await TemplateService.getAllTemplatesFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Templates retrieved successfully',
    data: result,
  })
})

const getSingleTemplate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TemplateService.getSingleTemplateFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Template retrieved successfully',
    data: result,
  })
})

const updateTemplate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TemplateService.updateTemplateIntoDB(
    id as string,
    req.body,
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Template updated successfully',
    data: result,
  })
})

const deleteTemplate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await TemplateService.deleteTemplateFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Template deleted successfully',
    data: null,
  })
})

export const TemplateController = {
  createTemplate,
  getAllTemplates,
  getSingleTemplate,
  updateTemplate,
  deleteTemplate,
}
