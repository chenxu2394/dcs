import { useGetOneProduct } from "@/features/use-products"
import { useParams } from "react-router-dom"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

export function OneProduct() {
  const { id = "" } = useParams<{ id: string }>()
  const [product, isLoading] = useGetOneProduct(id)
  return (
    <div className="p-2 justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : product ? (
        <Card>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </Card>
      ) : (
        <Card>
          <CardTitle>Product not found</CardTitle>
        </Card>
      )}
    </div>
  )
}
