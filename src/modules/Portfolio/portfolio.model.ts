import { model, Schema } from 'mongoose'
import {
  Education,
  Experience,
  Projects,
  Skills,
  SocialLinks,
  User,
} from './portfolio.interface'

const socialLinksSchema = new Schema<SocialLinks>({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
})

const projectsSchema = new Schema<Projects>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  images: { type: [String], required: true },
  link: { type: String, required: true },
  tags: { type: [String], required: true },
  repositoryLink: { type: String, required: true },
  notes: { type: String, required: true },
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
  link: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
})

const educationSchema = new Schema<Education>({
  title: { type: String, required: true },
  degree: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
})

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    profilePicture: { type: String, required: true },
    resume: { type: String, required: true },
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

export const PortfolioModel = model<User>('Portfolio', userSchema)
