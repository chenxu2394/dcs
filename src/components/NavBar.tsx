import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"

const NavMenuItemLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
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
    <div className="flex justify-center p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex">
            <NavMenuItemLink href="/">Home</NavMenuItemLink>
            <NavMenuItemLink href="/products">Products</NavMenuItemLink>
            <NavMenuItemLink href="/login">Login</NavMenuItemLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
