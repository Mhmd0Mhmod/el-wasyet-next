"use client";
import { revalidateNotifications } from "@/actions/notifications/actions";
import { NotificationsProvider } from "@/components/providers/NotficationsProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Notification } from "@/types/notification";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationSheetContent from "./NotificationSheetContent";
function NotificationButton({
  notifications,
}: {
  notifications?: Notification[];
}) {
  const [open, setOpen] = useState(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="relative">
          <BellIcon />
          {unReadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unReadCount > 99 ? "99+" : unReadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent dir="rtl" forceMount>
        <NotificationsProvider open={open}>
          <NotificationSheetContent />
        </NotificationsProvider>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
