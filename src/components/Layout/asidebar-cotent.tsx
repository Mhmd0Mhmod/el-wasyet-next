"use client";
import { NAVIGATION_LINKS } from "@/app/(query)/(dashboard)/dashboard/helper";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ASidebarContent({ user }: { user: User }) {
  const pathname = usePathname();
  const userAbilityHrefs = new Set(
    user?.abilities?.filter((ability) => ability.href).map((a) => a.href) || [],
  );

  const links = NAVIGATION_LINKS.filter((link) =>
    userAbilityHrefs.has(link.href),
  );

  console.log(user);

  return (
    <SidebarMenu className="space-y-1">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={link.label}
              className={cn("w-full justify-start", {
                "bg-muted": isActive,
              })}
            >
              <Link href={link.href} className="flex items-center gap-3">
                <link.icon className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {link.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
export default ASidebarContent;
