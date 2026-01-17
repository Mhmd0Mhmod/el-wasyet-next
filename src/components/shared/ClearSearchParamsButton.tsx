"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { ClassNameValue } from "tailwind-merge";

function ClearSearchParamsButton({
  className,
}: {
  className?: ClassNameValue;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = useCallback(() => {
    router.replace(pathname || "/");
  }, [router, pathname]);

  return (
    <Button
      variant="default"
      className={className?.toString()}
      onClick={handleClear}
    >
      مسح الفلاتر
    </Button>
  );
}

export default ClearSearchParamsButton;
