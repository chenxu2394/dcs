import { Category, CategoryCreate, CategoryUpdate, categoriesSchema, categorySchema } from "@/types"
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
  },
  createOne: async (category: CategoryCreate): Promise<Category> => {
    const token = localStorage.getItem("token")
    const res = await api.post(RESOURCE, category, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status !== 200) {
      throw new Error("Error creating category")
    }
    const validatedCategory = categorySchema.safeParse(res.data)
    if (!validatedCategory.success) {
      throw new Error("Error validating category")
    }
    return res.data
  },
  updateOne: async (category: CategoryUpdate): Promise<Category> => {
    const token = localStorage.getItem("token")
    const res = await api.put(RESOURCE, category, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status !== 200) {
      throw new Error("Error updating category")
    }
    const validatedCategory = categorySchema.safeParse(res.data)
    if (!validatedCategory.success) {
      throw new Error("Error validating category")
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
      throw new Error("Error deleting category")
    }
  }
}
