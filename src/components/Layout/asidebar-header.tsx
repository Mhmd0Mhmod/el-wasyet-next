"use client";
import logoSrc from "@/assets/logo.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
function ASidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={"الصفحه الرئيسيه"} size={"lg"} asChild>
          <Link href={"/"} className="flex items-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src={logoSrc}
                alt="الوسيط Logo"
                loading="lazy"
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider text-[#1a237e]">
                EL WASYET
              </span>
              <span className="text-muted-foreground text-right text-xs">
                الوسيط
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
export default ASidebarHeader;
