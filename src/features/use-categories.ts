import { Category } from "@/types"
import { getQueryKey } from "./utils"
import { useQuery } from "@tanstack/react-query"
import CategoryService from "@/api/categories"

const QUERY_KEY = "categories"

export function useGetCategories(): [Category[], boolean] {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: getQueryKey(QUERY_KEY),
    queryFn: CategoryService.getAll,
    initialData: []
  })
  return [categories, isLoading]
}
