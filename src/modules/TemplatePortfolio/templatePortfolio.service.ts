import { TemplatePortfolio } from './templatePortfolio.interface'
import { TemplatePortfolioModel } from './templatePortfolio.model'

const createTemplateIntoDB = async (payload: TemplatePortfolio) => {
  const result = await TemplatePortfolioModel.create(payload)
  return result
}

const getAllTemplatesFromDB = async () => {
  const result = await TemplatePortfolioModel.find()
  return result
}

const getSingleTemplateFromDB = async (id: string) => {
  const result = await TemplatePortfolioModel.findById(id)
  return result
}

const updateTemplateIntoDB = async (
  id: string,
  payload: Partial<TemplatePortfolio>,
) => {
  const result = await TemplatePortfolioModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTemplateFromDB = async (id: string) => {
  const result = await TemplatePortfolioModel.findByIdAndDelete(id)
  return result
}

export const TemplateService = {
  createTemplateIntoDB,
  getAllTemplatesFromDB,
  getSingleTemplateFromDB,
  updateTemplateIntoDB,
  deleteTemplateFromDB,
}
