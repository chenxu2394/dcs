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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
              Sign in to DCS
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <div className="space-y-4">
                <div>
                  <Button className="w-full bg-[#4285F4] text-white" variant="default">
                    Sign in with Google
                  </Button>
                </div>
                <div>
                  <Button className="w-full bg-[#1DA1F2] text-white" variant="default">
                    Sign in with X/Twitter
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="w-full space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                      onChange={handleChange}
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    {errors.password && <span className="text-red-500">{errors.passwor}</span>}
                  </div>
                  <div>
                    <Button className="w-full bg-[#4F46E5] text-white" variant="default">
                      Sign in
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
