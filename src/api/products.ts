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

  createOne: async () => {
    const res = await api.post(RESOURCE, {
      name: "Jeans",
      description: "This is a new product",
      quantity: 10,
      price: 100,
      discount: 0,
      categoryId: "de8a2af1-86b3-4471-a1dd-e52ab8d21f9c"
    })

    // if (res.status !== 200) {
    //   throw new Error("Error posting product")
    // }

    return res.data
  }
}
