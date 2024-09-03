import { Product, ProductCreate, productSchema, productsSchema } from "@/types"
import api from "."

const RESOURCE = "/products"

export default {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get(RESOURCE)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productsSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return []
    }
    return res.data
  },

  filterByName: async (name: string): Promise<Product[]> => {
    const res = await api.get(`${RESOURCE}?q=${name}`)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productsSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return []
    }
    return res.data
  },

  filterBy: async (
    name: string,
    category: string,
    minPrice: number,
    maxPrice: number
  ): Promise<Product[]> => {
    const res = await api.get(
      `${RESOURCE}?q=${name}&categories=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productsSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return []
    }
    return res.data
  },

  getOne: async (id: string): Promise<Product> => {
    const res = await api.get(`${RESOURCE}/${id}`)
    if (res.status !== 200) {
      throw new Error("Error fetching product")
    }

    const validatedProduct = productSchema.safeParse(res.data)
    if (!validatedProduct.success) {
      throw new Error("Error validating product")
    }

    return res.data
  },

  createOne: async (product: ProductCreate): Promise<Product> => {
    const res = await api.post(RESOURCE, product)

    if (res.status !== 200) {
      throw new Error("Error posting product")
    }

    const validatedProduct = productSchema.safeParse(res.data)
    if (!validatedProduct.success) {
      throw new Error("Error validating product")
    }

    return res.data
  },

  deleteOne: async (id: string) => {
    // const retrieved = localStorage.getItem("tokenAndDecodedToken")
    // const parsed = retrieved ? JSON.parse(retrieved) : null
    // const token = parsed ? parsed.token : null
    // console.log(token)

    const res = await api.delete(`${RESOURCE}/${id}`)

    //TODO: Delete with authorization
    // const res = await api.delete(`${RESOURCE}/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })

    if (res.status !== 204) {
      throw Error("somehting went wrong")
    }
  },

  updateOne: async (product: Product) => {
    //TODO: Update with authorization
    const res = await api.put(RESOURCE, product)

    if (res.status !== 200) {
      throw Error("somehting went wrong")
    }
  }
}
