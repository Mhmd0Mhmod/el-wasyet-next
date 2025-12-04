"use client";
import Link from "@/components/shared/Link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/lib/helper";

function NavigationItem({ link }: { link: NavLink }) {
  if (link.children) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-base">
          {link.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid w-fit gap-1 p-2">
            {link.children?.map((sublink) => (
              <NavigationMenuLink key={sublink.href} asChild>
                <Link
                  href={sublink.href}
                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                >
                  <div className="min-w-40 text-sm leading-none font-medium">
                    {sublink.label}
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={link?.href}
          className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {link.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export default NavigationItem;
