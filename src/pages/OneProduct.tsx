import { useGetOneProduct } from "@/features/use-products"
import { useParams } from "react-router-dom"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CartContext } from "@/providers/cart-provider"
import { useContext } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function OneProduct() {
  const { id = "" } = useParams<{ id: string }>()
  const [product, isFetching] = useGetOneProduct(id)
  const { addToCart } = useContext(CartContext)
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      toast({
        description: `${product.name} added to cart`
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.imageUrls?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (product?.imageUrls?.length || 1) - 1 : prevIndex - 1
    )
  }

  if (isFetching) {
    return <Spinner size="large" className="h-screen items-center justify-center" />
  }

  if (product === undefined) {
    return (
      <Card>
        <CardTitle>Product not found</CardTitle>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-[400px] bg-gray-100 dark:bg-slate-500">
              <img
                src={product.imageUrls[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex mt-4 justify-center">
                <div className="flex space-x-2 overflow-x-auto p-2">
                  {product.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} - Image ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer flex-shrink-0 ${
                        index === currentImageIndex ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-6 flex flex-col" style={{ minHeight: "400px" }}>
            <div>
              <CardTitle className="text-3xl font-bold mb-4">{product.name}</CardTitle>
              <CardDescription className="text-lg mb-6 dark:text-white">
                {product.description}
              </CardDescription>
            </div>
            <div className="mt-auto">
              <CardFooter className="p-0 flex-col items-end">
                <span className="text-5xl font-bold mb-2">€{product.price.toFixed(2)}</span>
                <Button onClick={handleAddToCart} size="lg">
                  Add to Cart
                </Button>
              </CardFooter>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
