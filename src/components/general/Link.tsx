"use client";
import { cn } from "@/lib/utils";
import LinkComponent from "next/link";
import { usePathname } from "next/navigation";
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <LinkComponent
      href={href}
      className={cn({
        "text-primary font-semibold": isActive,
        "text-gray-700 hover:text-primary": !isActive,
      })}
    >
      {children}
    </LinkComponent>
  );
}
export default Link;
