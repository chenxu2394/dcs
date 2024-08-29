import { Products } from "@/pages/Products"
import { UserContext } from "@/providers/user-provider"
import { useContext } from "react"

export function Home() {
  const context = useContext(UserContext)
  if (!context) {
    return <div>Loading...</div>
  }
  console.log("%csrc/pages/Home.tsx:10 context", "color: #007acc;", context)

  return <Products />
}
