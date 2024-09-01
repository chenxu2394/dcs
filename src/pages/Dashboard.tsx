import { Can } from "@/components/Can"
import { useCreateProduct } from "@/features/use-products"
import { ProductCreate } from "@/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGetProducts } from "@/features/use-products"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

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

  const [products, isLoading] = useGetProducts()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => addProduct.mutate(newProduct)}>Add Product</Button>}
      />
      <Table>
        {/* <TableCaption>A list of products</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price(€)</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                {/* <Button
                  variant="destructive"
                  onClick={() => {
                    productDelete.mutate(product.id)
                  }}
                >
                  Delete
                </Button>
                <UpdateDialog product={product} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
