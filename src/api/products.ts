import { ProductCreate } from "@/types"
import api from "."

const RESOURCE = "/products"

export default {
  getAll: async () => {
    const res = await api.get(RESOURCE)
    if (res.status !== 200) {
      throw new Error("Error fetching products")
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
