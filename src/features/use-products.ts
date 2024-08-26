import ProductService from "@/api/products"
import { Product, ProductCreate } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = "products"

export function getQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY]
}

export function getSearchQueryKey(searchTerm: string) {
  return [QUERY_KEY, "search", searchTerm]
}

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
    queryKey: getQueryKey(),
    queryFn: ProductService.getAll,
    initialData: []
  })
  return [products, isLoading]
}

export function useSearchProducts(name: string): [Product[], boolean] {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: getSearchQueryKey(name),
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
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    }
  })
  return mutation
}
