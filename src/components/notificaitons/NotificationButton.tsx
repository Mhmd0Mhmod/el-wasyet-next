"use client";
import { BellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "./EmptyState";
import { MarkAllAsReadButton } from "./MarkAllAsReadButton";
import { NotificationCard } from "./NotificationCard";
import { useNotification } from "@/hooks/use-notification";
import { Skeleton } from "@/components/ui/skeleton";

function NotificationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <BellIcon />
        </Button>
      </SheetTrigger>
      <SheetContent dir="rtl" className="w-full sm:max-w-md">
        <NotificationSheetContent />
      </SheetContent>
    </Sheet>
  );
}
function NotificationSheetContent() {
  const { data: notifications, isFetching } = useNotification();
  const unreadCount = notifications?.filter((n) => !n.isRead).length;
  const unreadNotifications = notifications?.filter((n) => !n.isRead);

  return (
    <>
      <div className="bg-primary">
        <SheetClose />
        <SheetHeader className="flex flex-row items-center justify-center gap-4 text-white">
          <BellIcon size={32} />
          <SheetTitle className="text-3xl text-white">الاشعارات</SheetTitle>
        </SheetHeader>
      </div>

      <Tabs defaultValue="all" className="w-full p-4" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="unread">
            غير مقروء
            {unreadCount && (
              <Badge variant="secondary" className="mr-2">
                ({unreadCount})
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          <ScrollArea className="h-[calc(100vh-325px)]">
            <div className="space-y-3 pr-4">
              {isFetching ? (
                <>
                  <LoadingNotificationCard />
                  <LoadingNotificationCard />
                  <LoadingNotificationCard />
                </>
              ) : notifications?.length === 0 ? (
                <EmptyState message="لا توجد إشعارات" />
              ) : (
                notifications?.map((notification) => (
                  <NotificationCard
                    key={notification.notificationId}
                    notification={notification}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          {!isFetching && unreadCount && <MarkAllAsReadButton />}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-4">
          <ScrollArea className="h-[calc(100vh-325px)]">
            <div className="space-y-3 pr-4">
              {isFetching ? (
                <>
                  <LoadingNotificationCard />
                  <LoadingNotificationCard />
                  <LoadingNotificationCard />
                </>
              ) : unreadNotifications?.length === 0 ? (
                <EmptyState message="لا توجد إشعارات غير مقروءة" />
              ) : (
                unreadNotifications?.map((notification) => (
                  <NotificationCard
                    key={notification.notificationId}
                    notification={notification}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          {!isFetching && unreadCount && <MarkAllAsReadButton />}
        </TabsContent>
      </Tabs>
    </>
  );
}

function LoadingNotificationCard() {
  return (
    <div className="flex animate-pulse space-x-4 rounded-lg border p-4">
      <div className="flex-1 space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
export default NotificationButton;
