import { Products } from "@/pages/Products"
import { TokenAndDecodedTokenContext } from "@/providers/token-provider"
import { useContext } from "react"

export function Home() {
  const context = useContext(TokenAndDecodedTokenContext)
  if (!context) {
    return <div>Loading...</div>
  }

  return <Products />
}
