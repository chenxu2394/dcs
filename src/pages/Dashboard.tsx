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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2Icon } from "lucide-react"
import { ProductDialog } from "@/components/ProductDialog"
import { useGetAllUsers, useDeleteUser } from "@/features/use-users"

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
  const [users, isLoadingUsers] = useGetAllUsers()
  const [categories, isLoadingCategories] = useGetCategories()
  const productDelete = useDeleteProduct()
  const [allCategories] = useGetCategories()
  const userDelete = useDeleteUser()

  if (isLoading || isLoadingUsers) {
    return <div>Loading...</div>
  }

  return (
    <Tabs defaultValue="products">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <div>
          <ProductDialog product={dummyProduct} allCategories={allCategories} forCreate={true} />
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
                    <ProductDialog
                      product={product}
                      allCategories={allCategories}
                      forCreate={false}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="users">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userRole}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button
                      // variant="destructive"
                      onClick={() => {
                        userDelete.mutate(user.id)
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="categories">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Button variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}
