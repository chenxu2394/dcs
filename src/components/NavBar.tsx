import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Can } from "./Can"
import { useContext } from "react"
import { TokenAndDecodedTokenContext } from "@/providers/token-provider"

export const NavMenuItemLink = ({
  href,
  onClick,
  children
}: {
  href: string
  onClick?: () => void
  children: React.ReactNode
}) => {
  return (
    <NavigationMenuLink
      className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
      href={href}
      onClick={onClick}
    >
      {children}
    </NavigationMenuLink>
  )
}

export function NavBar() {
  const { removeTokenAndDecodedToken } = useContext(TokenAndDecodedTokenContext)

  function handleLogout() {
    removeTokenAndDecodedToken()
  }

  return (
    <div className="flex justify-between items-center w-full p-2 shadow-md">
      <Link to="/" className="ml-4 font-bold text-lg no-underline">
        ECM
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex">
            <NavMenuItemLink href="/">Home</NavMenuItemLink>
            <NavMenuItemLink href="/products">Products</NavMenuItemLink>
            <Can
              permission="LOGIN:VIEW"
              permissionType="views"
              yes={() => <NavMenuItemLink href="/login">Login</NavMenuItemLink>}
            />
            <Can
              permission="DASHBOARD:VIEW"
              permissionType="views"
              yes={() => <NavMenuItemLink href="/dashboard">Dashboard</NavMenuItemLink>}
            />
            <Can
              permission="LOGOUT:VIEW"
              permissionType="views"
              yes={() => (
                <NavMenuItemLink href="/" onClick={handleLogout}>
                  Logout
                </NavMenuItemLink>
              )}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  )
}
