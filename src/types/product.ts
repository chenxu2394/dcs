export type Product = {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  discount: number
  categoryId: string
}

export type ProductCreate = Omit<Product, "id">

export type ProductUpdate = Partial<Product>
