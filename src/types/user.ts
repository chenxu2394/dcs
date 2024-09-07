import { z } from "zod"

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export type UserLoginType = z.infer<typeof userLoginSchema>

export const userRegisterSchema = userLoginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters")
})

export type UserRegisterType = z.infer<typeof userRegisterSchema>

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

export const retrievedUserDetailSchema = userRegisterSchema
  .omit({
    password: true
  })
  .extend({
    userRole: userRoleSchema,
    id: z.string()
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
