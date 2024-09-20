import { ChangeEvent, FormEvent, useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

import { useRegister } from "@/features/use-users"
import { userRegisterSchema } from "@/types"
import { useToast } from "@/components/ui/use-toast"

export function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: ""
  })
  const mutation = useRegister()
  const { toast } = useToast()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const result = userRegisterSchema.safeParse(credentials)
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
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center dark:text-white">
          Sign Up
        </h2>
        <div className="p-2 mt-8">
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <Input name="email" placeholder="Your email" onChange={handleChange} />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div>
              <Input name="name" placeholder="Your name" onChange={handleChange} />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
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
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
