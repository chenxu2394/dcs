import { z } from "zod"

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type UserLoginType = z.infer<typeof userLoginSchema>

export interface UsersState {
  users: UserLoginType[]
  loggedInUser: UserLoginType | null
}

export const retrievedUserDetailSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  userRole: z.string()
})

export type RetrievedUserDetail = z.infer<typeof retrievedUserDetailSchema>

export const decodedTokenSchema = z.object({
  sub: z.string(),
  user_id: z.string(),
  iat: z.number(),
  exp: z.number()
})

export type DecodedToken = z.infer<typeof decodedTokenSchema>

export const tokenSchema = z.string().startsWith("ey")
