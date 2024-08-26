import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Product } from "../types"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <Card onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add to Card</Button>
      </CardFooter>
    </Card>
  )
}
