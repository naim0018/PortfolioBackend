import { model, Schema } from 'mongoose'
import { TemplatePortfolio } from './templatePortfolio.interface'

const templatePortfolioSchema = new Schema<TemplatePortfolio>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: { type: [String], required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const TemplatePortfolioModel = model<TemplatePortfolio>(
  'TemplatePortfolio',
  templatePortfolioSchema,
)
