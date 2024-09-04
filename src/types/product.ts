import { z } from "zod"

export const categorySchema = z.object({
  id: z.string().or(z.null()),
  name: z.string().or(z.null()),
  description: z.string().or(z.null())
})

export type Category = z.infer<typeof categorySchema>

export const categoriesSchema = z.array(categorySchema)

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  category: categorySchema
})
export type Product = z.infer<typeof productSchema>

export const productCreateSchema = productSchema
  .omit({
    id: true,
    category: true
  })
  .extend({
    categoryId: z.string()
  })

export type ProductCreate = z.infer<typeof productCreateSchema>

export const productUpdateSchema = productSchema
  .omit({
    category: true
  })
  .extend({
    categoryId: z.string()
  })

export type ProductUpdate = z.infer<typeof productUpdateSchema>

export const productsSchema = z.array(productSchema)
export type Products = z.infer<typeof productsSchema>
