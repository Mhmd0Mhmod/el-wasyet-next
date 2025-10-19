import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NavLink from "@/components/dashboard/dashboard-navigation-link";
import { NAVIGATION_LINKS } from "./dashboard/helper";

function AsideBar() {
  return (
    <Sidebar side={"right"}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {NAVIGATION_LINKS.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
export default AsideBar;
