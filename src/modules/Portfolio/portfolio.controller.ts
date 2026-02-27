import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../app/utils/catchAsync'
import sendResponse from '../../app/utils/sendResponse'
import { PortfolioService } from './portfolio.service'

const createPortfolio = catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioService.createPortfolioIntoDB(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Portfolio created successfully',
    data: result,
  })
})

const getAllPortfolios = catchAsync(async (req: Request, res: Response) => {
  const result = await PortfolioService.getAllPortfoliosFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolios retrieved successfully',
    data: result,
  })
})

const getSinglePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PortfolioService.getSinglePortfolioFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolio retrieved successfully',
    data: result,
  })
})

const updatePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PortfolioService.updatePortfolioIntoDB(
    id as string,
    req.body,
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolio updated successfully',
    data: result,
  })
})

const deletePortfolio = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await PortfolioService.deletePortfolioFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Portfolio deleted successfully',
    data: null,
  })
})

export const PortfolioController = {
  createPortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
}
