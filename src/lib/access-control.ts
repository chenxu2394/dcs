export type Role = "ADMIN" | "USER"

export type RoleControl = {
  [key: string]: {
    views: PagePermission[]
    actions: ResourcePermission[]
  }
}

export type PermissionCategory = keyof RoleControl[Role]

type Page = "HOME" | "DASHBOARD"
type Resourse = "PRODUCT" | "USER"
type Method = "GET" | "ADD" | "EDIT" | "REMOVE"

export type PagePermission = `${Page}:VIEW`
export type ResourcePermission = `${Resourse}:${Method}`

export const RBAC_ROLES: RoleControl = {
  ADMIN: {
    views: ["HOME:VIEW", "DASHBOARD:VIEW"],
    actions: ["PRODUCT:GET", "PRODUCT:REMOVE", "PRODUCT:ADD"]
  },
  USER: {
    views: ["HOME:VIEW"],
    actions: ["PRODUCT:GET"]
  }
}
