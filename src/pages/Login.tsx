import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import api from "../api"
import { useNavigate } from "react-router-dom"
import { tokenSchema } from "@/types"
import { TokenAndDecodedTokenContext } from "@/providers/token-provider"
import { useLogin } from "@/features/use-users"

export function LogIn() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const { saveTokenAndDecodedToken } = useContext(TokenAndDecodedTokenContext)
  const mutation = useLogin()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(credentials)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-3xl">Welcome, bro/sis!</h3>
        <div className="p-2">
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <Input name="email" placeholder="Your email" onChange={handleChange} />
            <Input
              name="password"
              placeholder="Your password"
              type="password"
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </>
  )
}
