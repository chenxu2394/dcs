import { Products } from "@/pages/Products"
import { DecodedTokenContext } from "@/providers/token-provider"
import { useContext } from "react"

export function Home() {
  const context = useContext(DecodedTokenContext)
  if (!context) {
    return <div>Loading...</div>
  }

  return <Products />
}
