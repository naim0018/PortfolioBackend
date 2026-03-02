import { model, Schema } from 'mongoose'
import {
  Education,
  Experience,
  IPortfolio,
  Projects,
  Skills,
  SocialLinks,
} from './portfolio.interface'

const socialLinksSchema = new Schema<SocialLinks>({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: false },
})

const projectsSchema = new Schema<Projects>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: false },
  images: { type: [String], required: true },
  link: { type: String, required: false },
  tags: { type: [String], required: true },
  repositoryLink: { type: String, required: false },
  notes: { type: String, required: false },
})

const skillsSchema = new Schema<Skills>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  progress: { type: Number, required: true },
  category: { type: String, required: true },
})

const experienceSchema = new Schema<Experience>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String, required: false },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  location: { type: String, required: true },
})

const educationSchema = new Schema<Education>({
  title: { type: String, required: true },
  degree: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String, required: false },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  location: { type: String, required: true },
})

const portfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    socialLinks: { type: [socialLinksSchema], default: [] },
    projects: { type: [projectsSchema], default: [] },
    skills: { type: [skillsSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
  },
  {
    timestamps: true,
  },
)

export const PortfolioModel = model<IPortfolio>('Portfolio', portfolioSchema)
