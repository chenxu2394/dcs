import { z } from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  categoryId: z.string()
})
export type Product = z.infer<typeof productSchema>

export const productCreateSchema = productSchema.omit({ id: true })
export type ProductCreate = z.infer<typeof productCreateSchema>

export const productUpdateSchema = productSchema.partial()
export type ProductUpdate = z.infer<typeof productUpdateSchema>
