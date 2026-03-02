import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../app/utils/catchAsync'
import sendResponse from '../../app/utils/sendResponse'
import { UserService } from './user.service'

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await UserService.getSingleUserFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await UserService.updateUserIntoDB(id as string, req.body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await UserService.deleteUserFromDB(id as string)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data: null,
  })
})

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { role } = req.body

  if (role !== 'admin' && role !== 'user') {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Invalid role provided',
      data: null,
    })
    return
  }

  const result = await UserService.updateUserRoleIntoDB(id as string, role)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User role updated successfully',
    data: result,
  })
})

const trackProfileEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { eventType } = req.body

  if (eventType !== 'view' && eventType !== 'resume') {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Invalid event type. Must be "view" or "resume"',
      data: null,
    })
    return
  }

  const result = await UserService.trackProfileEventIntoDB(
    id as string,
    eventType as 'view' | 'resume',
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile event tracked successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { email, role } = (req as any).user
  const result = await UserService.getMeFromDB(email, role)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserRole,
  trackProfileEvent,
  getMe,
}
