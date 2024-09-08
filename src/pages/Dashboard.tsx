import { Product, UserRoles } from "@/types"
import { Button } from "@/components/ui/button"
import { useGetProducts, useDeleteProduct } from "@/features/use-products"
import { useGetCategories } from "@/features/use-categories"
import { v4 as uuidv4 } from "uuid"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2Icon } from "lucide-react"
import { ProductDialog } from "@/components/ProductDialog"
import { useGetAllUsers, useDeleteUser, useUpdateUser } from "@/features/use-users"
import { useState, useContext, useEffect } from "react"
import { DecodedTokenContext } from "@/providers/decodedToken-provider"

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
      name: "",
      description: ""
    }
  }

  const [products, isLoading] = useGetProducts()
  const [users, isLoadingUsers] = useGetAllUsers()
  const [categories, isLoadingCategories] = useGetCategories()
  const productDelete = useDeleteProduct()
  const [allCategories] = useGetCategories()
  const userDelete = useDeleteUser()
  const userUpdate = useUpdateUser()
  const { decodedToken } = useContext(DecodedTokenContext)
  const [userRoles, setUserRoles] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (users.length > 0) {
      const roles = users.reduce((acc, user) => {
        acc[user.id] = user.userRole === UserRoles.ADMIN
        return acc
      }, {} as { [key: string]: boolean })
      setUserRoles(roles)
    }
  }, [users])

  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name))

  if (!decodedToken) {
    return <div>You are not authorized to access this page</div>
  }

  const switchDisabled = users.reduce((acc, user) => {
    acc[user.id] = user.id === decodedToken.user_id
    return acc
  }, {} as { [key: string]: boolean })

  if (isLoading || isLoadingUsers || isLoadingCategories) {
    return <div>Loading...</div>
  }

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name))

  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name))

  const handleRoleChange = (userId: string, isAdmin: boolean) => {
    setUserRoles((prev) => ({
      ...prev,
      [userId]: isAdmin
    }))
    userUpdate.mutate({
      id: userId,
      name: users.find((user) => user.id === userId)?.name || "",
      email: users.find((user) => user.id === userId)?.email || "",
      userRole: isAdmin ? UserRoles.ADMIN : UserRoles.USER
    })
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
              {sortedProducts.map((product) => (
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
                <TableHead>Admin?</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userRole}</TableCell>
                  <TableCell>
                    <Switch
                      checked={userRoles[user.id]}
                      onCheckedChange={(checked) => handleRoleChange(user.id, checked)}
                      disabled={switchDisabled[user.id]}
                    />
                  </TableCell>
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
              {sortedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Button>
                      <Trash2Icon />
                    </Button>
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
