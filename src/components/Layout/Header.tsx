import { NAVBARLINKS } from "@/lib/helper";
import Logo from "./Logo";
import Link from "../general/Link";
import NotificationButton from "../general/NotificationButton";
import LogoutButton from "../auth/LogoutButton";

function Header() {
  return (
    <div className="flex items-center w-full justify-around">
      <div>
        <Logo withText width={150} height={40} />
      </div>
      <nav className="mr-10 flex gap-6">
        {NAVBARLINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center">
        <NotificationButton />
        <LogoutButton />
      </div>
    </div>
  );
}
export default Header;
