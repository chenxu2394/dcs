import { z } from "zod"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
})

export type Category = z.infer<typeof categorySchema>

export const categoriesSchema = z.array(categorySchema)

export const categoryCreateSchema = categorySchema.omit({
  id: true
})

export type CategoryCreate = z.infer<typeof categoryCreateSchema>
// update schema same as original schema
export const categoryUpdateSchema = categorySchema

export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>

// dialog can have id optional
export const categoryDialogSchema = categorySchema
  .omit({
    id: true
  })
  .extend({
    id: z.string().optional()
  })

export type CategoryDialogType = z.infer<typeof categoryDialogSchema>

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0).max(100, "Discount must be between 0 and 100"),
  category: categorySchema,
  imageUrls: z.array(z.string())
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

const sortSchema = z.object({
  empty: z.boolean(),
  sorted: z.boolean(),
  unsorted: z.boolean()
})

const pageableSchema = z.object({
  pageNumber: z.number(),
  pageSize: z.number(),
  sort: sortSchema,
  offset: z.number(),
  paged: z.boolean(),
  unpaged: z.boolean()
})

export const productApiResSchema = z.object({
  content: z.array(productSchema),
  pageable: pageableSchema,
  last: z.boolean(),
  totalPages: z.number(),
  totalElements: z.number(),
  first: z.boolean(),
  size: z.number(),
  number: z.number(),
  sort: sortSchema,
  numberOfElements: z.number(),
  empty: z.boolean()
})

export type ProductApiRes = z.infer<typeof productApiResSchema>

export const productApiResLiteSchema = productApiResSchema.pick({
  content: true,
  totalPages: true,
  totalElements: true,
  number: true,
  size: true
})

export type ProductApiResLite = z.infer<typeof productApiResLiteSchema>
