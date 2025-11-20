import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const LoadingNotificationCard = memo(function LoadingNotificationCard() {
  return (
    <div className="space-y-3 rounded-lg border p-4" dir="rtl">
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
});

export default LoadingNotificationCard;
