import { NAVBARLINKS } from "@/lib/helper";
import { ChevronDownIcon, PanelLeftClose } from "lucide-react";
import LogoutButton from "../auth/LogoutButton";
import Link from "../general/Link";
import NotificationButton from "../notificaitons/NotificationButton";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Logo from "./Logo";
function Header() {
  return (
    <div className="flex w-full items-center justify-between px-2 md:justify-around">
      <div>
        <Logo withText width={150} height={40} />
      </div>
      <nav className="mr-10 hidden gap-6 md:flex">
        <NavigationMenu dir="rtl">
          <NavigationMenuList className="gap-2">
            {NAVBARLINKS.map((link) =>
              link.children ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="text-base">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-fit gap-1 p-2">
                      {link.children?.map((sublink) => (
                        <NavigationMenuLink key={sublink.href} asChild>
                          <Link
                            href={sublink.href}
                            className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                          >
                            <div className="min-w-40 text-sm leading-none font-medium">
                              {sublink.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link?.href}
                      className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center">
        <NotificationButton />
        <div className="hidden md:block">
          <LogoutButton />
        </div>
        <div className="block md:hidden">
          <SheetButton />
        </div>
      </div>
    </div>
  );
}
export default Header;
function SheetButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <PanelLeftClose size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetClose />
        <SheetHeader>
          <SheetTitle className="m-auto">
            <Logo withText width={120} height={30} />
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="flex flex-col gap-4 p-4">
          {NAVBARLINKS.map((link) =>
            link.href ? (
              <Link key={link.href} href={link?.href}>
                {link.label}
              </Link>
            ) : (
              <Collapsible key={link.label}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-between p-0 underline"
                  >
                    {link.label}
                    <ChevronDownIcon />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    {link.children?.map((sublink) => (
                      <Link key={sublink.href} href={sublink.href}>
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ),
          )}
        </div>
        <Separator />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
