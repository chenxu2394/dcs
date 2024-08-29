import ProductService from "@/api/products"
import { Product, ProductCreate } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getQueryKey, getSearchQueryKey } from "./utils"

const QUERY_KEY = "products"

export function useGetOneProduct(id: string): [Product | undefined, boolean, Error | null] {
  const {
    data: product,
    isLoading,
    error
  } = useQuery<Product>({
    queryKey: getQueryKey(id),
    queryFn: () => ProductService.getOne(id)
    // enabled: !!id
  })
  return [product, isLoading, error]
}

export function useGetProducts(): [Product[], boolean, Error | null] {
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[]>({
    queryKey: getQueryKey(QUERY_KEY),
    queryFn: ProductService.getAll,
    initialData: []
  })
  return [products, isLoading, error]
}

export function useSearchProducts(name: string): [Product[], boolean, Error | null] {
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[]>({
    queryKey: getSearchQueryKey(QUERY_KEY, name),
    queryFn: () => ProductService.filterByName(name),
    initialData: []
  })
  return [products, isLoading, error]
}

export function useFilterProducts(
  name: string,
  category: string,
  minPrice: number,
  maxPrice: number
): [Product[], boolean, Error | null] {
  if (category === "All Categories") {
    category = ""
  }
  if (minPrice > maxPrice) {
    return [[], false, new Error("Min price cannot be greater than max price")]
  }
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[]>({
    queryKey: getSearchQueryKey(QUERY_KEY, name, category, minPrice, maxPrice),
    queryFn: () => ProductService.filterBy(name, category, minPrice, maxPrice),
    initialData: []
  })
  return [products, isLoading, error]
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
