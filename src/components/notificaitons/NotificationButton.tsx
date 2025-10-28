import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Notification } from "@/types/notification";
import { NotificationCard } from "./NotificationCard";
import { EmptyState } from "./EmptyState";
import { MarkAllAsReadButton } from "./MarkAllAsReadButton";

interface NotificationButtonProps {
  notifications?: Notification[];
}

function NotificationButton({ notifications = [] }: NotificationButtonProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  const handleReadNotification = (notificationId: number) => {
    console.log(notificationId);
  };

  const handleUnreadNotification = (notificationId: number) => {
    console.log(notificationId);
  };

  const handleMarkAllAsRead = () => {
    unreadNotifications.forEach((n) =>
      handleReadNotification(n.notificationId),
    );
  };

  const toggleNotificationStatus = (notification: Notification) => {
    if (notification.isRead) {
      handleUnreadNotification(notification.notificationId);
    } else {
      handleReadNotification(notification.notificationId);
    }
  };

  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <BellIcon />
        </Button>
      </SheetTrigger>
      <SheetContent dir="rtl" className="w-full sm:max-w-md">
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
              {unreadCount > 0 && (
                <Badge variant="secondary" className="mr-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-3 pr-4">
                {notifications.length === 0 ? (
                  <EmptyState message="لا توجد إشعارات" />
                ) : (
                  notifications.map((notification) => (
                    <NotificationCard
                      key={notification.notificationId}
                      notification={notification}
                      onToggle={toggleNotificationStatus}
                    />
                  ))
                )}
              </div>
            </ScrollArea>

            {unreadCount > 0 && (
              <MarkAllAsReadButton onClick={handleMarkAllAsRead} />
            )}
          </TabsContent>
          <TabsContent value="unread" className="mt-4 space-y-4">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-3 pr-4">
                {unreadNotifications.length === 0 ? (
                  <EmptyState message="لا توجد إشعارات غير مقروءة" />
                ) : (
                  unreadNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.notificationId}
                      notification={notification}
                      onToggle={toggleNotificationStatus}
                    />
                  ))
                )}
              </div>
            </ScrollArea>

            {unreadCount > 0 && (
              <MarkAllAsReadButton onClick={handleMarkAllAsRead} />
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
export default NotificationButton;
