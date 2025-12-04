"use client";
import { useNotifications } from "@/components/providers/NotficationsProvider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellIcon } from "lucide-react";
import { useMemo } from "react";
import { EmptyState } from "./EmptyState";
import { MarkAllAsReadButton } from "./MarkAllAsReadButton";
import { NotificationCard } from "./NotificationCard";
import LoadingNotificationCard from "./NotificationSkeleton";

function NotificationSheetContent() {
  const { unreadCount, isFetching, notifications, markAllAsRead } =
    useNotifications();

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.isRead),
    [notifications],
  );
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
              {isFetching &&
                Array.from({ length: 3 }).map((_, index) => (
                  <LoadingNotificationCard key={index} />
                ))}
              {!isFetching && notifications?.length === 0 && (
                <EmptyState message="لا توجد إشعارات" />
              )}
              {!isFetching &&
                notifications?.length > 0 &&
                notifications?.map((notification) => (
                  <NotificationCard
                    key={notification.notificationId}
                    notification={notification}
                  />
                ))}
            </div>
          </ScrollArea>

          {!isFetching && unreadCount > 0 && (
            <MarkAllAsReadButton onAllMarkedAsRead={markAllAsRead} />
          )}
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
              ) : unreadCount === 0 ? (
                <EmptyState message="لا توجد إشعارات غير مقروءة" />
              ) : (
                unreadNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.notificationId}
                    notification={notification}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          {!isFetching && unreadCount > 0 && (
            <MarkAllAsReadButton onAllMarkedAsRead={markAllAsRead} />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default NotificationSheetContent;
