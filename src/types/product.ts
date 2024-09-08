import { z } from "zod"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
})

export type Category = z.infer<typeof categorySchema>

export const categoriesSchema = z.array(categorySchema)

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0).max(100, "Discount must be between 0 and 100"),
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
    categoryId: z.string().min(1, "Category is required")
  })

export type ProductDialogType = z.infer<typeof productDialogSchema>

export const productsSchema = z.array(productSchema)
export type Products = z.infer<typeof productsSchema>
