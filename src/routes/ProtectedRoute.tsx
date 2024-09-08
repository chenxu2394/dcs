import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { DecodedTokenContext } from "@/providers/decodedToken-provider"
import { UserRoles } from "@/types"

interface Props {
  forAdmin?: boolean
}

export const ProtectedRoute = ({ forAdmin }: Props) => {
  const { isLoading, decodedToken } = useContext(DecodedTokenContext)
  const token = localStorage.getItem("token")

  if (isLoading && token) {
    return <div>Loading...</div>
  }

  if (!decodedToken) {
    // No token found, redirect to login
    console.log("No token found, redirecting to login.")
    return <Navigate to="/login" replace={true} />
  }
  if (forAdmin && decodedToken.user_role !== UserRoles.ADMIN) {
    // Not an admin, redirect to home
    console.log("Not an admin, redirecting to home.")
    return <Navigate to="/" replace={true} />
  }

  return <Outlet />
}
