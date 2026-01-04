import { getCurrentUser } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getNotifications } from "@/data/notifications";
import { NAVBARLINKS, NavLink } from "@/lib/helper";
import { BellIcon, PanelLeftClose } from "lucide-react";
import { Suspense } from "react";
import NotificationButton from "../notificaitons/NotificationButton";
import { ScrollArea } from "../ui/scroll-area";
import HeaderNavItem from "./header-nav-item";
import Logo from "./Logo";
import LogoutButton from "./logout-button";
import NavigationItem from "./NavigationItem";
import UserProfileButton from "./UserProfileButton";
import UserProfileDetails from "./UserProfileDetails";

async function Header() {
  const user = await getCurrentUser();
  const userAbilityHrefs = new Set(
    user?.abilities?.filter((ability) => ability.href).map((a) => a.href) || [],
  );

  const filterNavLinks = (links: NavLink[]): NavLink[] => {
    return links
      .map((link) => {
        if (link.href) {
          // Direct link - check if user has access
          return userAbilityHrefs.has(link.href) ? link : null;
        } else if (link.children) {
          // Parent with children - filter children
          const filteredChildren = link.children.filter((child) =>
            userAbilityHrefs.has(child.href),
          );
          // Only include parent if it has accessible children
          return filteredChildren.length > 0
            ? { ...link, children: filteredChildren }
            : null;
        }
        return null;
      })
      .filter((link): link is NavLink => link !== null);
  };

  const navlinks = filterNavLinks(NAVBARLINKS);

  return (
    <header className="flex h-16 items-center border-b">
      <div className="flex w-full items-center justify-between px-2 md:justify-around">
        <div>
          <Logo withText width={150} height={40} />
        </div>
        <nav className="mr-10 hidden gap-6 md:flex">
          <NavigationMenu dir="rtl">
            <NavigationMenuList className="gap-2">
              {navlinks.map((link) => (
                <NavigationItem key={link.label} link={link} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center">
          <Suspense
            fallback={
              <Button variant={"ghost"} size={"icon"}>
                <div className="animate-pulse">
                  <BellIcon />
                </div>
              </Button>
            }
          >
            <NotficationsButtonWrapper />
          </Suspense>
          <div className="hidden md:block">
            <UserProfileButton />
          </div>
          <div className="block md:hidden">
            <SheetButton navlinks={navlinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
async function NotficationsButtonWrapper() {
  const notifications = await getNotifications();
  return <NotificationButton notifications={notifications} />;
}

function SheetButton({ navlinks }: { navlinks: NavLink[] }) {
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
        <ScrollArea dir="rtl" className="h-72 overflow-auto">
          <div className="flex flex-col gap-4 p-4">
            {navlinks.map((link) => (
              <HeaderNavItem key={link.label} link={link} />
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <SheetFooter>
          <UserProfileDetails />
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
