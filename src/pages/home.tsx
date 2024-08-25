import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import { useGetProducts, useCreateProduct } from "@/features/use-products"
import { ProductCreate } from "@/types"
import { useState } from "react"

export function Home() {
  const [newProduct, setNewProduct] = useState<ProductCreate>({
    name: "Jeans",
    description: "This is a new product",
    quantity: 10,
    price: 100,
    discount: 0,
    categoryId: "de8a2af1-86b3-4471-a1dd-e52ab8d21f9c"
  })
  const [products, isLoading] = useGetProducts()
  const addProduct = useCreateProduct()

  return (
    <div className="p-2">
      <Button onClick={() => addProduct.mutate(newProduct)}>Add Product</Button>
      {isLoading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  )
}
