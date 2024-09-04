import { useContext } from "react"
import {
  // UserRoles,
  ResourcePermission,
  PagePermission,
  PermissionCategory,
  RBAC_ROLES
} from "../lib/access-control"
import { UserRoles } from "@/types"
import { DecodedTokenContext } from "@/providers/token-provider"

const checkPermission = (
  role: UserRoles,
  permission: ResourcePermission | PagePermission,
  permissionType: PermissionCategory
): boolean => {
  const permissions = RBAC_ROLES[role]
  if (!permissions) {
    return false
  }

  switch (permissionType) {
    case "views": {
      const viewPermissions = permissions.views
      if (!viewPermissions || viewPermissions.length === 0) {
        return false
      }

      const canViewPage = viewPermissions.includes(permission as PagePermission)
      if (!canViewPage) {
        return false
      }

      return true
    }

    case "actions": {
      const actionPermissions = permissions.actions
      if (!actionPermissions || actionPermissions.length === 0) {
        return false
      }

      const canPerformAction = actionPermissions.includes(permission as ResourcePermission)
      if (!canPerformAction) {
        return false
      }

      return true
    }

    default:
      return false
  }
}

type CanProp = {
  permission: ResourcePermission | PagePermission
  yes: () => JSX.Element
  no?: () => JSX.Element | null
  permissionType: PermissionCategory
}

export const Can = ({ permission, permissionType, yes, no = () => null }: CanProp) => {
  const context = useContext(DecodedTokenContext)

  let userRole: UserRoles = UserRoles.PUBLIC

  if (context && context.decodedToken) {
    userRole = context.decodedToken.user_role || UserRoles.PUBLIC
  }

  return checkPermission(userRole, permission, permissionType) ? yes() : no()
}
