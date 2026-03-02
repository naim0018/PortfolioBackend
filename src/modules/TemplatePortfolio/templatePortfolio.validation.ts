import { z } from 'zod'

const createTemplateValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string(),
    images: z.array(z.string()),
    link: z.string(),
  }),
})

const updateTemplateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    link: z.string().optional(),
  }),
})

export const TemplateValidation = {
  createTemplateValidationSchema,
  updateTemplateValidationSchema,
}
