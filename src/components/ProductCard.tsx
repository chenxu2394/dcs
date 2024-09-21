import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Product } from "../types"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <Card
      onClick={handleCardClick}
      className="grid grid-rows-2 h-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        <div className="relative w-1/3 h-32 overflow-hidden flex items-center justify-center">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          <img
            src={product.imageUrls[1]}
            alt={`${product.name} - alternate view`}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <CardTitle className="text-lg font-bold mb-2">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500 mb-2 line-clamp-2 overflow-hidden">
          {product.description}
        </CardDescription>
        <div className="text-lg font-semibold mt-auto">€{product.price}</div>
      </div>
    </Card>
  )
}
