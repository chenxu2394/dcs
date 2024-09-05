import { createContext, useEffect, useState } from "react"
import { Cart, Product } from "@/types"

export type CartContextType = {
  cart: Cart
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType>({
  cart: {},
  addToCart: () => {
    // intentionally left empty
  },
  removeFromCart: () => {
    // intentionally left empty
  },
  clearCart: () => {
    // intentionally left empty
  }
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({})
  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCart(JSON.parse(cart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const quantity = prevCart[product.id] ?? 0
      return {
        ...prevCart,
        [product.id]: quantity + 1
      }
    })
  }

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const quantity = prevCart[product.id] ?? 0
      if (quantity === 1) {
        const { [product.id]: _, ...rest } = prevCart
        return rest
      }
      return {
        ...prevCart,
        [product.id]: quantity - 1
      }
    })
  }

  const clearCart = () => {
    setCart({})
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
