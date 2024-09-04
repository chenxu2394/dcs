import { ChangeEvent, FormEvent, useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import { useRegister } from "@/features/use-users"

export function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: ""
  })
  const mutation = useRegister()

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
        <h3 className="text-3xl">Please Register</h3>
        <div className="p-2">
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <Input name="email" placeholder="Your email" onChange={handleChange} />
            <Input name="name" placeholder="Your name" onChange={handleChange} />
            <Input
              name="password"
              placeholder="Your password"
              type="password"
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
