import { Category, CategoryCreate, CategoryUpdate } from "@/types"
import { getQueryKey } from "./utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import CategoryService from "@/api/categories"
import { useToast } from "@/components/ui/use-toast"

const QUERY_KEY = "categories"

export function useGetCategories(): [Category[], boolean, Error | null] {
  const {
    data: categories,
    isLoading,
    error
  } = useQuery<Category[]>({
    queryKey: getQueryKey(QUERY_KEY),
    queryFn: CategoryService.getAll,
    initialData: []
  })
  return [categories, isLoading, error]
}

export function useCreateCategory() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (category: CategoryCreate) => CategoryService.createOne(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(QUERY_KEY) })
      toast({
        title: "Category created",
        description: "Category created successfully"
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Error creating category"
      })
    }
  })
  return mutation
}

export function useUpdateCategory() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (category: CategoryUpdate) => CategoryService.updateOne(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(QUERY_KEY) })
      toast({
        title: "Category updated",
        description: "Category updated successfully"
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Error updating category"
      })
    }
  })
  return mutation
}

export function useDeleteCategory() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (categoryId: string) => CategoryService.deleteOne(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(QUERY_KEY) })
      toast({
        title: "Category deleted",
        description: "Category deleted successfully"
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Error deleting category"
      })
    }
  })
  return mutation
}
