import { ChangeEvent, FormEvent, useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import { useLogin } from "@/features/use-users"
import { userLoginSchema } from "@/types"
import { useToast } from "@/components/ui/use-toast"

export function LogIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const mutation = useLogin()
  const { toast } = useToast()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const result = userLoginSchema.safeParse(credentials)
    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message
        toast({
          description: error.message
        })
        return acc
      }, {} as { [key: string]: string })
      setErrors(errorMessages)
      return
    }
    setErrors({})
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
            <div>
              <Input name="email" placeholder="Your email" onChange={handleChange} />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div>
              <Input
                name="password"
                placeholder="Your password"
                type="password"
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
