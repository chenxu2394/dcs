import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import api from "../api"

import { Product } from "../types"

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const handleFetch = async () => {
      const res = await api.get("/products")
      setProducts(res.data)
    }
    handleFetch()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
        </div>
      ))}
    </div>
  )
}
