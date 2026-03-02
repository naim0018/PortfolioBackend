import { UserModel } from '../User/user.model'
import { IPortfolio } from './portfolio.interface'
import { PortfolioModel } from './portfolio.model'

const flattenPortfolioData = (portfolio: any) => {
  if (!portfolio) return null
  const plainPortfolio = portfolio.toObject ? portfolio.toObject() : portfolio
  const { userId, ...rest } = plainPortfolio

  if (userId && typeof userId === 'object') {
    return {
      ...userId, // name, email, shortDescription, etc.
      ...rest, // socialLinks, projects, skills, etc.
      _id: plainPortfolio._id, // Ensure we use the Portfolio ID as the primary _id
      userId: userId._id || userId, // Keep the original User ID reference
    }
  }

  return plainPortfolio
}

const createPortfolioIntoDB = async (payload: any) => {
  // Extract user-related fields
  const userFields = [
    'name',
    'email',
    'shortDescription',
    'longDescription',
    'profilePicture',
    'resume',
    'isTrackingEnabled',
    'selectedTemplate',
    'whyPortfolio',
  ]

  const userData: any = {}
  const portfolioData: any = {}

  Object.keys(payload).forEach((key) => {
    if (userFields.includes(key)) {
      userData[key] = payload[key]
    } else {
      portfolioData[key] = payload[key]
    }
  })

  // Ensure userId is present in portfolioData
  if (payload.userId) {
    portfolioData.userId = payload.userId
  }

  // Update User if needed
  if (Object.keys(userData).length > 0 && payload.userId) {
    await UserModel.findByIdAndUpdate(payload.userId, userData, {
      new: true,
      runValidators: true,
    })
  }

  const result = await PortfolioModel.create(portfolioData)
  const populatedResult = await PortfolioModel.findById(result._id).populate(
    'userId',
  )
  return flattenPortfolioData(populatedResult)
}

const getAllPortfoliosFromDB = async () => {
  const result = await PortfolioModel.find().populate('userId')
  return result.map(flattenPortfolioData)
}

const getSinglePortfolioFromDB = async (id: string) => {
  // Try to find by Portfolio ID first, then by User ID
  let result = await PortfolioModel.findById(id).populate('userId')
  if (!result) {
    result = await PortfolioModel.findOne({ userId: id }).populate('userId')
  }
  return flattenPortfolioData(result)
}

const updatePortfolioIntoDB = async (id: string, payload: any) => {
  // Try to find by Portfolio ID first, then by User ID
  let portfolio = await PortfolioModel.findById(id)
  if (!portfolio) {
    portfolio = await PortfolioModel.findOne({ userId: id })
  }

  if (!portfolio) {
    throw new Error('Portfolio not found')
  }

  const portfolioId = portfolio._id

  // Extract user-related fields
  const userFields = [
    'name',
    'email',
    'shortDescription',
    'longDescription',
    'profilePicture',
    'resume',
    'isTrackingEnabled',
    'selectedTemplate',
    'whyPortfolio',
  ]

  const userData: any = {}
  const portfolioData: any = {}

  Object.keys(payload).forEach((key) => {
    if (userFields.includes(key)) {
      userData[key] = payload[key]
    } else {
      portfolioData[key] = payload[key]
    }
  })

  // Update User if needed
  if (Object.keys(userData).length > 0) {
    await UserModel.findByIdAndUpdate(portfolio.userId, userData, {
      new: true,
      runValidators: true,
    })
  }

  // Update Portfolio
  const result = await PortfolioModel.findByIdAndUpdate(
    portfolioId,
    portfolioData,
    {
      new: true,
      runValidators: true,
    },
  ).populate('userId')
  return flattenPortfolioData(result)
}

const deletePortfolioFromDB = async (id: string) => {
  const result = await PortfolioModel.findByIdAndDelete(id)
  return result
}

export const PortfolioService = {
  createPortfolioIntoDB,
  getAllPortfoliosFromDB,
  getSinglePortfolioFromDB,
  updatePortfolioIntoDB,
  deletePortfolioFromDB,
}

