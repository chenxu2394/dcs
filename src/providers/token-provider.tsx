import { DecodedToken, Token, TokenAndDecodedToken } from "@/types"
import jwtDecode from "jwt-decode"
import { createContext, useEffect, useState } from "react"
import { isTokenValid } from "@/lib/utils"
import router from "@/routers"

export type TokenAndDecodedTokenContextType = {
  tokenAndDecodedToken: TokenAndDecodedToken | null
  saveTokenAndDecodedToken: (token: Token) => void
  removeTokenAndDecodedToken: () => void
}

export const TokenAndDecodedTokenContext = createContext<TokenAndDecodedTokenContextType>({
  tokenAndDecodedToken: null,
  saveTokenAndDecodedToken: () => {
    // intentionally left empty
  },
  removeTokenAndDecodedToken: () => {
    // intentionally left empty
  }
})

export function TokenAndDecodedTokenProvider({ children }: { children: React.ReactNode }) {
  const [tokenAndDecodedToken, setTokenAndDecodedToken] = useState<TokenAndDecodedToken | null>(
    null
  )

  useEffect(() => {
    const retrieved = localStorage.getItem("tokenAndDecodedToken")
    const res = retrieved ? JSON.parse(retrieved) : null
    if (res) {
      setTokenAndDecodedToken(res)
    }
  }, [])

  useEffect(() => {
    if (tokenAndDecodedToken) {
      localStorage.setItem("tokenAndDecodedToken", JSON.stringify(tokenAndDecodedToken))
    }
  }, [tokenAndDecodedToken])

  const saveTokenAndDecodedToken = (token: Token) => {
    const decoded = jwtDecode<DecodedToken>(token) as DecodedToken
    const isValid = isTokenValid(decoded)
    if (!isValid) {
      router.navigate("/login")
      return
    }
    const res = { token, decodedToken: decoded }
    localStorage.setItem("tokenAndDecodedToken", JSON.stringify(res))
    setTokenAndDecodedToken(res)
  }

  const removeTokenAndDecodedToken = () => {
    localStorage.removeItem("tokenAndDecodedToken")
    setTokenAndDecodedToken(null)
  }

  return (
    <TokenAndDecodedTokenContext.Provider
      value={{ tokenAndDecodedToken, saveTokenAndDecodedToken, removeTokenAndDecodedToken }}
    >
      {children}
    </TokenAndDecodedTokenContext.Provider>
  )
}
