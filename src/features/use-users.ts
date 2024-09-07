import UserService from "@/api/users"
import {
  RetrievedUserDetail,
  Token,
  tokenSchema,
  UserLoginType,
  UserRegisterType,
  UserRoles
} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getQueryKey } from "./utils"
import { useContext } from "react"
import { DecodedTokenContext } from "@/providers/decodedToken-provider"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

const QUERY_KEY = "users"
const LOGIN_QUERY_KEY = "logged_in_user_token"

export function useLogin() {
  const { saveDecodedToken } = useContext(DecodedTokenContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (credentials: UserLoginType) => UserService.login(credentials),
    onSuccess: (token) => {
      // console.log(token)
      const isValid = tokenSchema.safeParse(token)
      if (isValid.success) {
        saveDecodedToken(token)
        // queryClient.invalidateQueries(getQueryKey(LOGIN_QUERY_KEY))
        queryClient.setQueryData(getQueryKey(LOGIN_QUERY_KEY), token)
        navigate("/")
        toast({
          description: "Login successful"
        })
      } else {
        toast({
          description: "Invalid credentials"
        })
      }
    },
    onError: (error) => {
      console.error("Login error:", error)
      toast({
        description: "An error occurred"
      })
    }
  })
  return mutation
}

export function useRegister() {
  const { saveDecodedToken } = useContext(DecodedTokenContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (credentials: UserRegisterType) => UserService.register(credentials),
    onSuccess: (token) => {
      // console.log(token)
      const isValid = tokenSchema.safeParse(token)
      if (isValid.success) {
        saveDecodedToken(token)
        // queryClient.invalidateQueries(getQueryKey(LOGIN_QUERY_KEY))
        queryClient.setQueryData(getQueryKey(LOGIN_QUERY_KEY), token)
        navigate("/")
        toast({
          description: "Registration successful"
        })
      } else {
        toast({
          description: "Registration failed"
        })
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data as string
        toast({
          description: errorMessage
        })
      } else {
        toast({
          description: "An error occurred"
        })
      }
    }
  })
  return mutation
}

export function useGetUserDetails(
  userId: string | null,
  options: { enabled: boolean }
): [RetrievedUserDetail, boolean, Error | null, () => void] {
  if (!userId) {
    return [
      { email: "", id: "", userRole: UserRoles.PUBLIC, name: "" },
      false,
      new Error("userId is null"),
      () => {
        // intentionally left empty
      }
    ]
  }
  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: getQueryKey(LOGIN_QUERY_KEY),
    queryFn: () => UserService.getUserDetails(userId),
    enabled: options.enabled,
    initialData: { email: "", id: "", userRole: UserRoles.PUBLIC, name: "" }
  })
  return [user, isLoading, error, refetch]
}

export function useGetAllUsers(): [RetrievedUserDetail[], boolean, Error | null] {
  const { data, isLoading, error } = useQuery({
    queryKey: getQueryKey(QUERY_KEY),
    queryFn: () => UserService.getAllUsers(),
    initialData: []
  })
  return [data, isLoading, error]
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(QUERY_KEY) })
    },
    onError: (error) => {
      console.error(error)
    }
  })
  return mutation
}
