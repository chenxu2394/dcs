import { Can } from "@/components/Can"
import { ProductCreate } from "@/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  useGetProducts,
  useDeleteProduct,
  useCreateProduct,
  useUpdateProduct
} from "@/features/use-products"
import { useGetCategories } from "@/features/use-categories"
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
import { Trash2Icon } from "lucide-react"
import { ProductDialog } from "@/components/ProductDialog"

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
  const productDelete = useDeleteProduct()
  const [allCategories] = useGetCategories()

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
            <TableHead>Discount(%)</TableHead>
            <TableHead>Category </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.discount}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex gap-1">
                <Button
                  // variant="destructive"
                  onClick={() => {
                    productDelete.mutate(product.id)
                  }}
                >
                  <Trash2Icon />
                </Button>
                <ProductDialog product={product} allCategories={allCategories} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
