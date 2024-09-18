import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
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
      <div className="flex justify-center p-4">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-1/3 h-auto object-contain"
        />
      </div>
      <CardContent>
        <div>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <CardDescription className="text-gray-500">
            {product.description.slice(0, 50)}
            {product.description.length > 50 && "..."}
          </CardDescription>
        </div>
        <CardFooter>€{product.price}</CardFooter>
      </CardContent>
    </Card>
  )
}
