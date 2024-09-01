import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Can } from "./Can"

export const NavMenuItemLink = ({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <NavigationMenuLink
      className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
      href={href}
    >
      {children}
    </NavigationMenuLink>
  )
}

export function NavBar() {
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
            <NavMenuItemLink href="/dashboard">Dashboard</NavMenuItemLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  )
}
