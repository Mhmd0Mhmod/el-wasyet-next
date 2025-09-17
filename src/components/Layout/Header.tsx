import { NAVBARLINKS } from "@/lib/helper";
import { PanelLeftClose } from "lucide-react";
import LogoutButton from "../auth/LogoutButton";
import Link from "../general/Link";
import NotificationButton from "../general/NotificationButton";
import { Button } from "../ui/button";
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
import { Separator } from "../ui/separator";
function Header() {
  return (
    <div className="flex items-center w-full md:justify-around justify-between px-2">
      <div>
        <Logo withText width={150} height={40} />
      </div>
      <nav className="mr-10  gap-6 hidden md:flex">
        {NAVBARLINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center">
        <NotificationButton />
        <div className="hidden md:block ">
          <LogoutButton />
        </div>
        <div className="md:hidden block">
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
          {NAVBARLINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="flex items-center gap-2">{link.label}</div>
            </Link>
          ))}
        </div>
        <Separator />
        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
