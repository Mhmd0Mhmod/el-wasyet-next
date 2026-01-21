import { getCurrentUser } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getNotificationsServer } from "@/data/notifications";
import { NAVBARLINKS, NavLink } from "@/lib/helper";
import { BellIcon } from "lucide-react";
import { Suspense } from "react";
import NotificationButton from "../notificaitons/NotificationButton";
import HeaderSheet from "./HeaderSheet";
import Logo from "./Logo";
import NavigationItem from "./NavigationItem";
import UserProfileButton from "./UserProfileButton";

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
    <header className="flex h-14 items-center border-b sm:h-16">
      <div className="flex w-full items-center justify-between gap-2 md:px-6">
        <Logo withText />

        <nav className="hidden flex-1 xl:flex">
          <NavigationMenu dir="rtl">
            <NavigationMenuList>
              {navlinks.map((link) => (
                <NavigationItem key={link.label} link={link} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Suspense
            fallback={
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <div className="animate-pulse">
                  <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </Button>
            }
          >
            <NotficationsButtonWrapper />
          </Suspense>
          <div className="hidden md:block">
            <UserProfileButton user={user} />
          </div>
          <div className="block xl:hidden">
            <HeaderSheet navlinks={navlinks} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
async function NotficationsButtonWrapper() {
  const notifications = await getNotificationsServer();
  return <NotificationButton notifications={notifications} />;
}
