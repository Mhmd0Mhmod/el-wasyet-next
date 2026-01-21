"use client";
import { revalidateNotifications } from "@/actions/notifications/actions";
import { NotificationsProvider } from "@/components/providers/NotficationsProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Notification } from "@/types/notification";
import { BellIcon } from "lucide-react";
import { useEffect } from "react";
import NotificationSheetContent from "./NotificationSheetContent";
function NotificationButton({
  notifications,
}: {
  notifications?: Notification[];
}) {
  const unReadCount = notifications
    ? notifications.filter((n) => !n.isRead).length
    : 0;
  useEffect(() => {
    const id = setInterval(async () => {
      await revalidateNotifications();
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="relative h-9 w-9 sm:h-10 sm:w-10"
        >
          <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          {unReadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white sm:h-5 sm:w-5 sm:text-[10px]">
              {unReadCount > 99 ? "99+" : unReadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent dir="rtl" forceMount>
        <NotificationsProvider>
          <NotificationSheetContent />
        </NotificationsProvider>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
