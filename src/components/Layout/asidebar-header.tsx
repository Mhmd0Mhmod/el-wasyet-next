"use client";
import logoWithTextSrc from "@/assets/logo-with-text.png";
import logoSrc from "@/assets/logo.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
function ASidebarHeader() {
  const { open } = useSidebar();
  const [logo, setLogo] = useState<StaticImageData>(logoWithTextSrc);
  useEffect(() => {
    if (open) {
      setLogo(logoWithTextSrc);
    } else {
      setLogo(logoSrc);
    }
  }, [open]);
  return (
    <SidebarMenu
      className={cn("flex flex-row items-center-safe justify-between", {
        "flex-col": !open,
      })}
    >
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={"الصفحه الرئيسيه"}>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="الوسيط Logo"
              width={128}
              height={128}
              loading="lazy"
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <SidebarTrigger className="h-6 w-6" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
export default ASidebarHeader;
