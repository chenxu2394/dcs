export type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
}

export type ProductCreate = Omit<Product, "id">

export type ProductUpdate = Partial<Product>
