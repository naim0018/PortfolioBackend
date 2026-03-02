import { z } from 'zod'

const socialLinksValidationSchema = z.object({
  logo: z.string(),
  name: z.string(),
  description: z.string(),
  link: z.string().optional(),
})

const projectsValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
  link: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  repositoryLink: z.string().optional(),
  notes: z.string().optional(),
})

const skillsValidationSchema = z.object({
  name: z.string(),
  logo: z.string(),
  progress: z.number().min(0).max(100),
  category: z.string(),
})

const experienceValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  logo: z.string(),
  link: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
})

const educationValidationSchema = z.object({
  title: z.string(),
  degree: z.string(),
  description: z.string(),
  logo: z.string(),
  link: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
})

const createPortfolioValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    socialLinks: z.array(socialLinksValidationSchema).optional(),
    projects: z.array(projectsValidationSchema).optional(),
    skills: z.array(skillsValidationSchema).optional(),
    experience: z.array(experienceValidationSchema).optional(),
    education: z.array(educationValidationSchema).optional(),
  }),
})

const updatePortfolioValidationSchema = z.object({
  body: z.object({
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
