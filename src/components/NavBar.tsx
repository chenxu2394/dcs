import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Can } from "./Can"
import { useContext, useEffect, useRef } from "react"
import { DecodedTokenContext } from "@/providers/decodedToken-provider"
import { Button } from "./ui/button"
import { ShoppingCartIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

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

export function NavBar({ setNavBarHeight }: { setNavBarHeight: (height: number) => void }) {
  const { removeDecodedToken } = useContext(DecodedTokenContext)
  const navigate = useNavigate()
  const navBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight)
    }
  }, [])

  function handleLogout() {
    removeDecodedToken()
  }

  return (
    <div
      ref={navBarRef}
      className="flex justify-between items-center w-full py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto shadow-md"
    >
      <Link to="/" className="ml-4 font-bold text-lg no-underline">
        DCS
      </Link>
      <div className="flex-grow flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex">
              <NavMenuItemLink href="/">Home</NavMenuItemLink>
              <NavMenuItemLink href="/">About</NavMenuItemLink>
              <Can
                permission="LOGIN:VIEW"
                permissionType="views"
                yes={() => <NavMenuItemLink href="/login">Login</NavMenuItemLink>}
              />
              <Can
                permission="REGISTER:VIEW"
                permissionType="views"
                yes={() => <NavMenuItemLink href="/register">Register</NavMenuItemLink>}
              />
              <Can
                permission="DASHBOARD:VIEW"
                permissionType="views"
                yes={() => <NavMenuItemLink href="/dashboard">Dashboard</NavMenuItemLink>}
              />
              <Can
                permission="PROFILE:VIEW"
                permissionType="views"
                yes={() => <NavMenuItemLink href="/profile">Profile</NavMenuItemLink>}
              />
              <Can
                permission="LOGOUT:VIEW"
                permissionType="views"
                yes={() => (
                  <NavMenuItemLink href="/login" onClick={handleLogout}>
                    Logout
                  </NavMenuItemLink>
                )}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center mr-4 gap-2">
        <Button
          variant="outline"
          onClick={() => {
            navigate("/cart")
          }}
        >
          <ShoppingCartIcon />
        </Button>
        <ModeToggle />
      </div>
    </div>
  )
}
