import api from "../api"
import { useQuery } from "@tanstack/react-query"

import { Product } from "../types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
    <div className="p-2">
      <div className="grid grid-cols-3 gap-5">
        {isLoading && <p>Loading...</p>}
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Add to Card</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
