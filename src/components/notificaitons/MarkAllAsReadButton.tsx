"use client";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export function MarkAllAsReadButton({
  onAllMarkedAsRead,
}: {
  onAllMarkedAsRead: () => void;
}) {
  const onClick = useCallback(() => {
    onAllMarkedAsRead();
  }, [onAllMarkedAsRead]);
  return (
    <div className="pt-4">
      <Button className="w-full" size="lg" onClick={onClick}>
        تحديد الكل كمقروء
      </Button>
    </div>
  );
}
