"use client";
import { cn } from "@/lib/utils";
import LinkComponent from "next/link";
import { usePathname } from "next/navigation";
function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <LinkComponent
      href={href}
      className={cn(
        {
          "text-primary font-semibold": isActive,
          "hover:text-primary text-gray-700": !isActive,
        },
        className,
      )}
    >
      {children}
    </LinkComponent>
  );
}
export default Link;
