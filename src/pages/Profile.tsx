import { useContext } from "react"
import { DecodedTokenContext } from "@/providers/decodedToken-provider"
import { Navigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export function Profile() {
  const { decodedToken } = useContext(DecodedTokenContext)
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace={true} />
  }

  if (!decodedToken) {
    return <Spinner size="large" className="h-screen items-center justify-center" />
  }

  return (
    <div className="flex justify-center p-20">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {decodedToken.sub}</p>
          <p>User Name: {decodedToken.user_name}</p>
        </CardContent>
      </Card>
    </div>
  )
}
