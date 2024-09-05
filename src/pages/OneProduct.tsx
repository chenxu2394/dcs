import { useGetOneProduct } from "@/features/use-products"
import { useParams } from "react-router-dom"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CartContext } from "@/providers/cart-provider"
import { useContext } from "react"
import { useToast } from "@/components/ui/use-toast"

export function OneProduct() {
  const { id = "" } = useParams<{ id: string }>()
  const [product, isLoading] = useGetOneProduct(id)
  const { addToCart } = useContext(CartContext)
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      toast({
        description: `${product.name} added to cart`
      })
    }
  }

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
          <Button onClick={handleAddToCart}>Add to Card</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
