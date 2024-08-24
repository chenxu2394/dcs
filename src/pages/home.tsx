import api from "../api"
import { useQuery } from "@tanstack/react-query"

import { Product } from "../types"
import { ProductList } from "@/components/ProductList"

export function Home() {
  const handleFetchProducts = async () => {
    const res = await api.get("/products")
    if (res.status !== 200) {
      throw new Error("Error fetching products")
    }
    return res.data
  }

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: handleFetchProducts,
    initialData: []
  })

  return (
    <div className="p-2">{isLoading ? <p>Loading...</p> : <ProductList products={products} />}</div>
  )
}
