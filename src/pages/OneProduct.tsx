import { useGetOneProduct } from "@/features/use-products"
import { useParams } from "react-router-dom"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function OneProduct() {
  const { id = "" } = useParams<{ id: string }>()
  const [product, isLoading] = useGetOneProduct(id)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (product === undefined) {
    return (
      <Card>
        <CardTitle>Product not found</CardTitle>
      </Card>
    )
  }

  return (
    <div className="flex justify-center min-h-fit">
      <Card className="p-2 w-1/2">
        <CardTitle className="p-2">{product.name}</CardTitle>
        <CardDescription className="p-2">{product.description}</CardDescription>
        <CardFooter className="p-2 justify-end">
          <Button>Add to Card</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
