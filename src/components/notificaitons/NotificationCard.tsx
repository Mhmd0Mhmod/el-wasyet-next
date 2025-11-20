"use client";
import Dialog from "@/components/shared/Dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notification";
import { useCallback, useState } from "react";
import { useNotifications } from "../providers/NotficationsProvider";
import RequestConfirmDialogContent from "./Request-Confirm-Dialog-Content";

interface NotificationCardProps {
  notification: Notification;
}

const openDialgCallback = (notification: Notification) => {
  if (
    (!notification.isRead && notification.isRequest) ||
    notification.isRequestStock
  ) {
    return true;
  }
  return false;
};
export function NotificationCard({ notification }: NotificationCardProps) {
  const isClickable = openDialgCallback(notification);
  const { markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => {
    if (isClickable) {
      setOpen(true);
    }
  }, [isClickable]);

  const updateReadStatus = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isClickable) {
        return openDialog();
      }
      markAsRead(notification.notificationId);
    },
    [notification.notificationId, markAsRead, isClickable, openDialog],
  );

  return (
    <Dialog open={open} setOpen={setOpen}>
      <Card
        className={cn({
          "border-purple-200 bg-purple-50": !notification.isRead,
          "cursor-pointer hover:bg-gray-50": isClickable,
        })}
        dir="rtl"
        onClick={openDialog}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm">{notification.type}</CardTitle>
            {!notification.isRead && (
              <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-sm">
            {notification.message}
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {formatDate(notification.date, "datetime")}
            </span>
            {notification.isRead && (
              <span className="text-sm text-green-600">مقروء</span>
            )}
            {!notification.isRead && (
              <Button
                onClick={updateReadStatus}
                variant="link"
                size="sm"
                className="h-auto p-0 text-purple-600"
              >
                تحديد كمقروء
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog.Content title="هل انت موافق">
        <RequestConfirmDialogContent
          notification={notification}
          setOpen={setOpen}
        />
      </Dialog.Content>
    </Dialog>
  );
}
