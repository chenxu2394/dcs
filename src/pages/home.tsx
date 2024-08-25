import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import { useGetProducts, useCreateProduct } from "@/features/use-products"

export function Home() {
  const [products, isLoading] = useGetProducts()
  const addProduct = useCreateProduct()

  return (
    <div className="p-2">
      <Button onClick={() => addProduct.mutate()}>Add Product</Button>
      {isLoading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  )
}
