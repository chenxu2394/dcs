import { Product, ProductCreate, productsSchema } from "@/types"
import api from "."

const RESOURCE = "/products"

export default {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get(RESOURCE)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productsSchema.safeParse(res.data)
    console.log("%csrc/api/products.ts:14 validatedProducts", "color: #007acc;", validatedProducts)
    if (!validatedProducts.success) {
      return []
    }
    return res.data
  },

  getOne: async (id: string) => {
    const res = await api.get(`${RESOURCE}/${id}`)
    if (res.status !== 200) {
      throw new Error("Error fetching product")
    }
    return res.data
  },

  createOne: async (product: ProductCreate) => {
    const res = await api.post(RESOURCE, product)

    if (res.status !== 200) {
      throw new Error("Error posting product")
    }

    return res.data
  }
}
