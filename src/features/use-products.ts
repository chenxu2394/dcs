import ProductService from "@/api/products"
import { Product, ProductCreate } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getQueryKey, getSearchQueryKey } from "./utils"

const QUERY_KEY = "products"

export function useGetOneProduct(id: string): [Product | undefined, boolean] {
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: getQueryKey(id),
    queryFn: () => ProductService.getOne(id)
    // enabled: !!id
  })
  return [product, isLoading]
}

export function useGetProducts(): [Product[], boolean] {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: getQueryKey(QUERY_KEY),
    queryFn: ProductService.getAll,
    initialData: []
  })
  return [products, isLoading]
}

export function useSearchProducts(name: string): [Product[], boolean] {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: getSearchQueryKey(QUERY_KEY, name),
    queryFn: () => ProductService.filterByName(name),
    initialData: []
  })
  return [products, isLoading]
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (product: ProductCreate) => ProductService.createOne(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(QUERY_KEY) })
    }
  })
  return mutation
}
