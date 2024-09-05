import { Button } from "@/components/ui/button"
import { useGetProducts } from "@/features/use-products"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Trash2Icon, EditIcon } from "lucide-react"
import { CartContext } from "@/providers/cart-provider"
import { useContext } from "react"

export function Cart() {
  const [products, isLoading] = useGetProducts()
  const { cart, removeFromCart } = useContext(CartContext)
  console.log(cart)
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="flex justify-center text-4xl">Your Cart</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price(€)</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find((product) => product.id === productId)
            if (!product) {
              return null
            }
            return (
              <TableRow key={productId}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{product.price * quantity}</TableCell>
                <TableCell className="flex justify-center gap-1">
                  <Button onClick={() => removeFromCart(product)}>
                    <Trash2Icon />
                  </Button>
                  <Button variant="outline">
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {Object.values(cart).reduce((acc, quantity) => acc + quantity, 0)}
            </TableCell>
            <TableCell>
              {Object.entries(cart).reduce((acc, [productId, quantity]) => {
                const product = products.find((product) => product.id === productId)
                if (!product) {
                  return acc
                }
                return acc + product.price * quantity
              }, 0)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
