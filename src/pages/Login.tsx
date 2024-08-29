import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import api from "../api"

export function LogIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    console.log(credentials)

    const res = await api.post("/users/login", credentials)
    console.log(res)
    const token = res.data

    //TODO: if you recieve a token then redirect to the home page

    localStorage.setItem("token", token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
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
  )
}
