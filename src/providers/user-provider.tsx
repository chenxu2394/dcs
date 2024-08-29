import { createContext, ReactNode, useEffect, useState } from "react"
import { RetrievedUserDetail, DecodedToken, decodedTokenSchema } from "@/types"
import jwtDecode from "jwt-decode"
import { useQuery } from "@tanstack/react-query"
import api from "../api"

export const UserContext = createContext<RetrievedUserDetail | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("")
  const token = localStorage.getItem("token")

  // Move this to the api folder
  const getUserDetails = async () => {
    if (userId) {
      const res = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    }

    throw Error("Did not fetch user info")
  }

  // Move this to query folder
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
    enabled: !!userId,
    initialData: {}
  })

  const handleDecodeUser = (token: string) => {
    const decodedToken = jwtDecode(token)
    const isValid = decodedTokenSchema.safeParse(decodedToken)
    if (!isValid.success) {
      throw new Error("Token decoding failed")
    }
    return decodedToken
  }

  useEffect(() => {
    if (token) {
      const decodedToken = handleDecodeUser(token) as DecodedToken
      setUserId(decodedToken.user_id)
    }
  }, [token])
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
