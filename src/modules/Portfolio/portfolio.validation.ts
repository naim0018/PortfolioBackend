import { z } from 'zod'

const socialLinksValidationSchema = z.object({
  logo: z.string(),
  name: z.string(),
  description: z.string(),
  link: z.string().url(),
})

const projectsValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  coverImage: z.string().url(),
  images: z.array(z.string().url()),
  link: z.string().url(),
  tags: z.array(z.string()),
  repositoryLink: z.string().url(),
  notes: z.string(),
})

const skillsValidationSchema = z.object({
  name: z.string(),
  logo: z.string().url(),
  progress: z.number().min(0).max(100),
  category: z.string(),
})

const experienceValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  logo: z.string().url(),
  link: z.string().url(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
})

const educationValidationSchema = z.object({
  title: z.string(),
  degree: z.string(),
  description: z.string(),
  logo: z.string().url(),
  link: z.string().url(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
})

const createPortfolioValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'user']).optional(),
    shortDescription: z.string(),
    longDescription: z.string(),
    profilePicture: z.string().url(),
    resume: z.string().url(),
    socialLinks: z.array(socialLinksValidationSchema).optional(),
    projects: z.array(projectsValidationSchema).optional(),
    skills: z.array(skillsValidationSchema).optional(),
    experience: z.array(experienceValidationSchema).optional(),
    education: z.array(educationValidationSchema).optional(),
  }),
})

const updatePortfolioValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    profilePicture: z.string().url().optional(),
    resume: z.string().url().optional(),
    socialLinks: z.array(socialLinksValidationSchema).optional(),
    projects: z.array(projectsValidationSchema).optional(),
    skills: z.array(skillsValidationSchema).optional(),
    experience: z.array(experienceValidationSchema).optional(),
    education: z.array(educationValidationSchema).optional(),
  }),
})

export const PortfolioValidation = {
  createPortfolioValidationSchema,
  updatePortfolioValidationSchema,
}
