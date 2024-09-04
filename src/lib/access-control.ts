import { UserRoles } from "@/types"

export type RoleControl = {
  [key: string]: {
    views: PagePermission[]
    actions: ResourcePermission[]
  }
}

export type PermissionCategory = keyof RoleControl[UserRoles]

type Page = "HOME" | "DASHBOARD" | "LOGIN" | "LOGOUT" | "REGISTER"
type Resourse = "PRODUCT" | "USER"
type Method = "GET" | "ADD" | "EDIT" | "REMOVE"

export type PagePermission = `${Page}:VIEW`
export type ResourcePermission = `${Resourse}:${Method}`

export const RBAC_ROLES: RoleControl = {
  ADMIN: {
    views: ["HOME:VIEW", "DASHBOARD:VIEW", "LOGOUT:VIEW"],
    actions: ["PRODUCT:GET", "PRODUCT:REMOVE", "PRODUCT:ADD"]
  },
  USER: {
    views: ["HOME:VIEW", "LOGOUT:VIEW"],
    actions: ["PRODUCT:GET"]
  },
  PUBLIC: {
    views: ["HOME:VIEW", "LOGIN:VIEW", "REGISTER:VIEW"],
    actions: ["PRODUCT:GET"]
  }
}
