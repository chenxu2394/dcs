import { DecodedToken, Token } from "@/types"
import jwtDecode from "jwt-decode"
import { createContext, useEffect, useMemo, useState } from "react"
import { isTokenValid } from "@/lib/utils"
import router from "@/routers"

export type DecodedTokenContextType = {
  isLoading: boolean
  decodedToken: DecodedToken | null
  saveDecodedToken: (token: Token) => void
  removeDecodedToken: () => void
}

export const DecodedTokenContext = createContext<DecodedTokenContextType>({
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true)

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
    setIsLoading(false)
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

  const providerValue = useMemo(
    () => ({
      isLoading,
      decodedToken,
      saveDecodedToken,
      removeDecodedToken
    }),
    [decodedToken]
  )

  return (
    <DecodedTokenContext.Provider value={providerValue}>{children}</DecodedTokenContext.Provider>
  )
}
