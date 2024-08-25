import api from "@/api"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"

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
