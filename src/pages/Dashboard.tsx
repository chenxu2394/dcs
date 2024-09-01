import { Can } from "@/components/Can"
import { useCreateProduct } from "@/features/use-products"
import { ProductCreate } from "@/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const [newProduct, setNewProduct] = useState<ProductCreate>({
    name: "Jeans",
    description: "This is a new product",
    quantity: 10,
    price: 100_000,
    discount: 0,
    categoryId: "de8a2af1-86b3-4471-a1dd-e52ab8d21f9c"
  })
  const addProduct = useCreateProduct()

  return (
    <div>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => addProduct.mutate(newProduct)}>Add Product</Button>}
      />
    </div>
  )
}
