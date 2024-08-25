import ProductService from "@/api/products"
import { Product, ProductCreate } from "@/types"
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
  const mutation = useMutation({
    mutationFn: (product: ProductCreate) => ProductService.createOne(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    }
  })
  return mutation
}
