import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function PageLayout({
  title,
  description,
  backButton = false,
  extra,
  className,
  children,
}: {
  title: string;
  description?: string;
  backButton?: boolean;
  extra?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("container space-y-12 pt-6", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start",
        )}
      >
        <div className="flex items-center gap-4">
          {backButton && (
            <Button variant="ghost">
              <Link href={"/orders"} className="text-gray-500 hover:underline">
                <ArrowRight className="inline-block" size={24} />
              </Link>
            </Button>
          )}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
        {extra && <div>{extra}</div>}
      </div>
      {children}
    </section>
  );
}
export default PageLayout;
