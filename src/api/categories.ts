import { Category, categoriesSchema } from "@/types"
import api from "."

const RESOURCE = "/categories"

export default {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get(RESOURCE)
    if (res.status !== 200) {
      throw new Error("Error fetching categories")
    }

    const validatedCategories = categoriesSchema.safeParse(res.data)
    if (!validatedCategories.success) {
      return []
    }

    return res.data
  }
}
