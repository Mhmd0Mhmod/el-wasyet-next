import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <section
      className={cn(
        "container max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 md:space-y-8 lg:space-y-12",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4",
        )}
      >
        <div className="flex w-full items-start gap-2 sm:w-auto sm:gap-4">
          {backButton && (
            <Button variant="ghost" size="sm" className="mt-1 shrink-0">
              <Link href={"/orders"} className="text-gray-500 hover:underline">
                <ArrowRight className="inline-block" size={20} />
              </Link>
            </Button>
          )}
          <div className="min-w-0 space-y-1 sm:space-y-2">
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500 sm:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
        {extra && (
          <div className="flex w-full shrink-0 justify-end sm:w-auto">
            {extra}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
export default PageLayout;
