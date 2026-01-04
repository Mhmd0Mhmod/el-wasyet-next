"use client";
import Link from "@/components/shared/Link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavLink } from "@/lib/helper";
import { ChevronDownIcon } from "lucide-react";

function HeaderNavItem({ link }: { link: NavLink }) {
  if (link.href)
    return (
      <Link key={link.href} href={link?.href}>
        {link.label}
      </Link>
    );
  return (
    <Collapsible key={link.label}>
      <CollapsibleTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-full justify-between p-0 underline"
        >
          {link.label}
          <ChevronDownIcon />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          {link?.children?.map((sublink) => (
            <Link key={sublink.href} href={sublink.href}>
              {sublink.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
export default HeaderNavItem;
