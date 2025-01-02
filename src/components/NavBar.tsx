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
import { SVGProps } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"

export const NavMenuItemLink = ({
  href,
  onClick,
  className,
  children
}: {
  href: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
}) => {
  return (
    <NavigationMenuLink
      className={cn(
        "text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]",
        className
      )}
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
      className="relative flex items-center w-full py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto shadow-md"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <Link to="/" className="absolute left-4 font-bold text-lg no-underline">
            DCS<span className="text-orange-500">.</span>
          </Link>
          <div className="grid justify-center mt-10 w-full">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="grid gap-10 py-6">
                  <NavMenuItemLink className="w-full" href="/">
                    Home
                  </NavMenuItemLink>
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
        </SheetContent>
      </Sheet>
      <Link to="/" className="absolute left-4 font-bold text-lg no-underline hidden lg:flex">
        DCS<span className="text-orange-500">.</span>
      </Link>
      <div className="mx-auto justify-center hidden lg:flex">
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
      <div className="absolute right-4 flex items-center gap-2">
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

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
