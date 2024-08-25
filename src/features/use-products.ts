import api from "@/api"
import { Product } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const handleFetchProducts = async () => {
  const res = await api.get("/products")
  if (res.status !== 200) {
    throw new Error("Error fetching products")
  }
  return res.data
}

export function useGetProducts(): [Product[], boolean] {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: handleFetchProducts,
    initialData: []
  })
  return [products, isLoading]
}

const handleAddProduct = async () => {
  const res = await api.post("/products", {
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
export function useCreateProduct() {
  const queryClient = useQueryClient()
  const mutation = useMutation<Product>({
    mutationFn: handleAddProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
  return mutation
}
