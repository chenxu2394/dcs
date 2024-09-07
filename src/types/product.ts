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
  quantity: z.number().min(0, { message: "Quantity must be greater than 0" }),
  price: z.number().min(0, { message: "Price must be greater than 0" }),
  discount: z
    .number()
    .min(0, { message: "Discount must be greater than 0" })
    .max(100, { message: "Discount must be less than 100" }),
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

export const productDialogSchema = productSchema
  .omit({
    id: true,
    category: true
  })
  .extend({
    id: z.string().optional(),
    categoryId: z.string()
  })

export type ProductDialogType = z.infer<typeof productDialogSchema>

export const productsSchema = z.array(productSchema)
export type Products = z.infer<typeof productsSchema>
