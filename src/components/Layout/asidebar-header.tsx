"use client";
import logoWithTextSrc from "@/assets/logo-with-text.png";
import logoSrc from "@/assets/logo.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <SidebarMenu className={cn("flex flex-row items-center justify-center")}>
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
    </SidebarMenu>
  );
}
export default ASidebarHeader;
