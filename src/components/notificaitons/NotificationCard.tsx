"use client";
import {
  approveRequestNotification,
  approveRequestStockNotification,
  markNotificationAsRead,
  rejectRequestNotification,
  rejectRequestStockNotification,
} from "@/actions/notifications/actions";
import { formatDate } from "@/lib/helper";
import { Notification } from "@/types/notification";
import { useCallback, useState } from "react";
import Dialog from "../general/Dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: Notification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const [open, setOpen] = useState(false);
  const updateReadStatus = useCallback(async () => {
    await markNotificationAsRead(notification.notificationId);
  }, [notification.notificationId]);

  const openDialog = useCallback(() => {
    if (notification.isRequestStock || notification.isRequest) setOpen(true);
  }, [notification]);
  const approveRequest = useCallback(async () => {
    const id = toast.loading("جاري المعالجة...");
    try {
      let response;
      if (notification.requestId && notification.isRequest) {
        response = await approveRequestNotification({
          requestId: notification.requestId,
        });
      } else if (notification.requestStockId && notification.isRequestStock) {
        response = await approveRequestStockNotification({
          requestStockId: notification.requestStockId,
        });
      }
      if (response?.success) {
        toast.success("تمت الموافقة بنجاح.", { id });
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة.", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
    }
  }, [notification]);
  const rejectRequest = useCallback(async () => {
    const id = toast.loading("جاري المعالجة...");
    try {
      let response;
      if (notification.requestId && notification.isRequest) {
        response = await rejectRequestNotification({
          requestId: notification.requestId,
        });
      } else if (notification.requestStockId && notification.isRequestStock) {
        response = await rejectRequestStockNotification({
          requestStockId: notification.requestStockId,
        });

        if (response?.success) {
          toast.success("تمت الموافقة بنجاح.", { id });
        } else {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
        }
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
    }
  }, [notification]);
  const isClickable = notification.isRequestStock || notification.isRequest;
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
        <div className="grid gap-4 pt-4 md:grid-cols-2">
          <Button variant="outline" onClick={rejectRequest}>
            لا
          </Button>
          <Button onClick={approveRequest}>نعم</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
