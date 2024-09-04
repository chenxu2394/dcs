import { Can } from "@/components/Can"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useGetProducts, useDeleteProduct } from "@/features/use-products"
import { useGetCategories } from "@/features/use-categories"
import { v4 as uuidv4 } from "uuid"
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
  const dummyProduct: Product = {
    id: uuidv4(),
    name: "Sample Product",
    description: "This is a sample product",
    quantity: 10,
    price: 100_000,
    discount: 0,
    category: {
      id: null,
      name: null,
      description: null
    }
  }

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
        yes={() => (
          <ProductDialog product={dummyProduct} allCategories={allCategories} forCreate={true} />
        )}
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
                <ProductDialog product={product} allCategories={allCategories} forCreate={false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
