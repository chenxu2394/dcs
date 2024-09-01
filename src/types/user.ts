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

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
  PUBLIC = "PUBLIC"
}

const userRoleSchema = z.nativeEnum(UserRoles)

export type UserRole = z.infer<typeof userRoleSchema>

export const retrievedUserDetailSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  userRole: userRoleSchema
})

export type RetrievedUserDetail = z.infer<typeof retrievedUserDetailSchema>

export const decodedTokenSchema = z.object({
  sub: z.string(),
  user_id: z.string(),
  user_role: userRoleSchema,
  iat: z.number(),
  exp: z.number()
})

export type DecodedToken = z.infer<typeof decodedTokenSchema>

export const tokenSchema = z.string().startsWith("ey")

export type Token = z.infer<typeof tokenSchema>

export const tokenAndDecodedTokenSchema = z.object({
  token: tokenSchema,
  decodedToken: decodedTokenSchema
})

export type TokenAndDecodedToken = z.infer<typeof tokenAndDecodedTokenSchema>
