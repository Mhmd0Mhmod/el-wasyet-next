"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(href);
  return (
    <Button asChild variant={isActive ? "default" : "ghost"} className="w-full">
      <Link href={href}>{children}</Link>
    </Button>
  );
}
export default NavLink;
