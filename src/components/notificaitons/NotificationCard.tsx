"use client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Notification } from "@/types/notification";
import { formatDate } from "@/lib/helper";
import { useCallback } from "react";
import { markNotificationAsRead } from "@/actions/notifications/actions";

interface NotificationCardProps {
  notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const updateReadStatus = useCallback(async () => {
    await markNotificationAsRead(notification.notificationId);
  }, [notification.notificationId]);

  return (
    <Card
      className={notification.isRead ? "" : "border-purple-200 bg-purple-50"}
      dir="rtl"
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
  );
}
