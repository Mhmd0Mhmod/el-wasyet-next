"use client";
import { markNotificationAsRead } from "@/actions/notifications/actions";
import Dialog from "@/components/general/Dialog";
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
import { useCallback, useState, useTransition } from "react";
import RequestConfirmDialogContent from "./Request-Confirm-Dialog-Content";
import RequestStockConfirmDialogContent from "./RequestStockConfirmDialogContent";

interface NotificationCardProps {
  notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const [open, setOpen] = useState(false);
  const [notificationState, setNotificationState] = useState(notification);
  const [, startTransition] = useTransition();
  const updateReadStatus = useCallback(async () => {
    if (notificationState.isRead) return;
    if (notification.isRequestStock || notification.isRequest) return;
    startTransition(() => {
      setNotificationState((prev) => ({ ...prev, isRead: true }));
      markNotificationAsRead(notification.notificationId);
    });
  }, [notification, notificationState]);

  const openDialog = useCallback(() => {
    if (notificationState.isRead) return;
    if (notification.isRequestStock || notification.isRequest) setOpen(true);
  }, [notification, notificationState]);
  const isClickable = notification.isRequestStock || notification.isRequest;
  return (
    <Dialog open={open} setOpen={setOpen}>
      <Card
        className={cn({
          "border-purple-200 bg-purple-50": !notificationState.isRead,
          "cursor-pointer hover:bg-gray-50": isClickable,
        })}
        dir="rtl"
        onClick={openDialog}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm">{notificationState.type}</CardTitle>
            {!notificationState.isRead && (
              <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-sm">
            {notificationState.message}
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {formatDate(notificationState.date, "datetime")}
            </span>
            {notificationState.isRead && (
              <span className="text-sm text-green-600">مقروء</span>
            )}
            {!notificationState.isRead && (
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
        {notificationState.isRequest && (
          <RequestConfirmDialogContent
            notification={notificationState}
            setOpen={setOpen}
            setNotificationState={setNotificationState}
          />
        )}
        {notificationState.isRequestStock && (
          <RequestStockConfirmDialogContent
            notification={notificationState}
            setOpen={setOpen}
            setNotificationState={setNotificationState}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
}
