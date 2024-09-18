import {
  Product,
  ProductCreate,
  ProductUpdate,
  productSchema,
  productApiResSchema,
  ProductApiResLite
} from "@/types"
import api from "."

const RESOURCE = "/products"

export default {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get(RESOURCE)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productApiResSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return []
    }
    return validatedProducts.data.content
  },

  filterByName: async (name: string): Promise<ProductApiResLite> => {
    const res = await api.get(`${RESOURCE}?q=${name}`)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productApiResSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0
      }
    }
    return {
      content: validatedProducts.data.content,
      totalPages: validatedProducts.data.totalPages,
      totalElements: validatedProducts.data.totalElements,
      number: validatedProducts.data.number,
      size: validatedProducts.data.size
    }
  },

  filterBy: async (
    name: string,
    category: string,
    minPrice: number,
    maxPrice: number,
    page: number,
    size: number
  ): Promise<ProductApiResLite> => {
    const res = await api.get(
      `${RESOURCE}?q=${name}&categories=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`
    )
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }

    const validatedProducts = productApiResSchema.safeParse(res.data)
    if (!validatedProducts.success) {
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 0
      }
    }
    return {
      content: validatedProducts.data.content,
      totalPages: validatedProducts.data.totalPages,
      totalElements: validatedProducts.data.totalElements,
      number: validatedProducts.data.number,
      size: validatedProducts.data.size
    }
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
    const token = localStorage.getItem("token")
    const res = await api.post(RESOURCE, product, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

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
    const token = localStorage.getItem("token")
    const res = await api.delete(`${RESOURCE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status !== 204) {
      throw Error("somehting went wrong")
    }
  },

  updateOne: async (product: ProductUpdate): Promise<Product> => {
    const token = localStorage.getItem("token")
    const res = await api.put(RESOURCE, product, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status !== 200) {
      throw Error("somehting went wrong")
    }

    const validatedProduct = productSchema.safeParse(res.data)
    if (!validatedProduct.success) {
      throw new Error("Error validating product")
    }

    return res.data
  }
}
