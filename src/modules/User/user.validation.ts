import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional(),
    role: z.enum(['admin', 'user']).optional(),
    shortDescription: z.string(),
    longDescription: z.string(),
    whyPortfolio: z.string().optional(), // New field
    profilePicture: z.string().optional(),
    resume: z.string().optional(),
    isTrackingEnabled: z.boolean().optional(),
    selectedTemplate: z.string().optional(),
  }),
})

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    whyPortfolio: z.string().optional(), // New field
    profilePicture: z.string().optional(),
    resume: z.string().optional(),
    isTrackingEnabled: z.boolean().optional(),
    selectedTemplate: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
