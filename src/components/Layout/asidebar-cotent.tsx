"use client";
import { NAVIGATION_LINKS } from "@/app/(query)/(dashboard)/dashboard/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function ASidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="space-y-1">
      {NAVIGATION_LINKS.map((link) => {
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
