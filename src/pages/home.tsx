import api from "../api"
import { useQuery } from "@tanstack/react-query"

import { Product } from "../types"

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
    queryFn: handleFetchProducts
  })

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      {isLoading && <p>Loading...</p>}
      {products?.map((product) => (
        <div key={product.id}>
          <h4>{product.name}</h4>
        </div>
      ))}
    </div>
  )
}
