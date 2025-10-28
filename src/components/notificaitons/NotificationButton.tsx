import { getNotifications } from "@/data/notifications";
import { BellIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EmptyState } from "./EmptyState";
import { MarkAllAsReadButton } from "./MarkAllAsReadButton";
import { NotificationCard } from "./NotificationCard";

async function NotificationButton() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  console.log(unreadCount);

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
                  ({unreadCount})
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <ScrollArea className="h-[calc(100vh-325px)]">
              <div className="space-y-3 pr-4">
                {notifications.length === 0 ? (
                  <EmptyState message="لا توجد إشعارات" />
                ) : (
                  notifications.map((notification) => (
                    <NotificationCard
                      key={notification.notificationId}
                      notification={notification}
                    />
                  ))
                )}
              </div>
            </ScrollArea>

            {unreadCount > 0 && <MarkAllAsReadButton />}
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
                    />
                  ))
                )}
              </div>
            </ScrollArea>

            {unreadCount > 0 && <MarkAllAsReadButton />}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
export default NotificationButton;
