import api from "../api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Product } from "../types"
import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import { useGetProducts } from "@/features/use-products"

export function Home() {
  const queryClient = useQueryClient()
  const [products, isLoading] = useGetProducts()

  const handleAddProduct = async () => {
    const res = await api.post("/products", {
      name: "Jeans",
      description: "This is a new product",
      quantity: 10,
      price: 100,
      discount: 0,
      categoryId: "de8a2af1-86b3-4471-a1dd-e52ab8d21f9c"
    })

    console.log("%csrc/pages/home.tsx:23 res", "color: #007acc;", res)
    // if (res.status !== 200) {
    //   throw new Error("Error posting product")
    // }

    queryClient.invalidateQueries({ queryKey: ["products"] })
    return res.data
  }

  const mutation = useMutation<Product[]>({
    mutationFn: handleAddProduct
  })

  return (
    <div className="p-2">
      <Button onClick={() => mutation.mutate()}>Add Product</Button>
      {isLoading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  )
}
