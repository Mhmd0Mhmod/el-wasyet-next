"use client";
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
import { NavLink } from "@/lib/helper";
import { PanelLeftClose } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import HeaderNavItem from "./header-nav-item";
import Logo from "./Logo";
import LogoutButton from "./logout-button";
import UserProfileDetails from "./UserProfileDetails";
import { Session } from "next-auth";
import { Button } from "../ui/button";

function HeaderSheet({
  user,
  navlinks,
}: {
  user?: Session["user"];
  navlinks: NavLink[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
        >
          <PanelLeftClose className="h-4 w-4 sm:h-5 sm:w-5" />
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
        <ScrollArea dir="rtl" className="overflow-y-auto">
          <div className="flex flex-col gap-4 p-4">
            {navlinks.map((link) => (
              <HeaderNavItem key={link.label} link={link} />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter className="border-t shadow-2xl">
          <UserProfileDetails user={user} />
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default HeaderSheet;
