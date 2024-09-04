import { DecodedToken, Token } from "@/types"
import jwtDecode from "jwt-decode"
import { createContext, useEffect, useState } from "react"
import { isTokenValid } from "@/lib/utils"
import router from "@/routers"

export type DecodedTokenContextType = {
  decodedToken: DecodedToken | null
  saveDecodedToken: (token: Token) => void
  removeDecodedToken: () => void
}

export const DecodedTokenContext = createContext<DecodedTokenContextType>({
  decodedToken: null,
  saveDecodedToken: () => {
    // intentionally left empty
  },
  removeDecodedToken: () => {
    // intentionally left empty
  }
})

export function DecodedTokenProvider({ children }: { children: React.ReactNode }) {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token) as DecodedToken
      const isValid = isTokenValid(decoded)
      if (!isValid) {
        router.navigate("/login")
        return
      }
      setDecodedToken(decoded)
    }
  }, [])

  const saveDecodedToken = (token: Token) => {
    const decoded = jwtDecode<DecodedToken>(token) as DecodedToken
    const isValid = isTokenValid(decoded)
    if (!isValid) {
      router.navigate("/login")
      return
    }
    localStorage.setItem("token", token)
    setDecodedToken(decoded)
  }

  const removeDecodedToken = () => {
    localStorage.removeItem("token")
    setDecodedToken(null)
  }

  return (
    <DecodedTokenContext.Provider
      value={{
        decodedToken,
        saveDecodedToken,
        removeDecodedToken
      }}
    >
      {children}
    </DecodedTokenContext.Provider>
  )
}
