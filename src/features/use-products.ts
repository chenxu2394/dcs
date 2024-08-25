import ProductService from "@/api/products"
import { Product } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = "products"

export function getQueryKey() {
  return [QUERY_KEY]
}

export function useGetProducts(): [Product[], boolean] {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: getQueryKey(),
    queryFn: ProductService.getAll,
    initialData: []
  })
  return [products, isLoading]
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const mutation = useMutation<Product>({
    mutationFn: ProductService.createOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    }
  })
  return mutation
}
