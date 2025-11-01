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
import { useCallback, useRef, useState } from "react";
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
import { Input } from "../ui/input";

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
        {notification.isRequest && (
          <RequestConfirmDialogContent
            notification={notification}
            setOpen={setOpen}
          />
        )}
        {notification.isRequestStock && (
          <RequestStockConfirmDialogContent
            notification={notification}
            setOpen={setOpen}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
}
function RequestConfirmDialogContent({
  notification,
  setOpen,
}: {
  notification: Notification;
  setOpen: (open: boolean) => void;
}) {
  const [showPartialInput, setShowPartialInput] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFullAcceptance = useCallback(async () => {
    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
    try {
      const response = await approveRequestNotification({
        requestId: notification.requestId,
      });

      if (response?.success) {
        toast.success("تمت الموافقة بنجاح.", { id });
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, { id });
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
    }
  }, [notification, setOpen]);

  const handlePartialAcceptance = useCallback(async () => {
    if (!showPartialInput) {
      setShowPartialInput(true);
      return;
    }

    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
    try {
      const remainingValue = parseInt(ref?.current?.value || "0");
      const response = await approveRequestNotification({
        requestId: notification.requestId,
        Remainingvalue: remainingValue,
      });

      if (response?.success) {
        toast.success("تمت الموافقة بنجاح.", { id });
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, { id });
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
      setShowPartialInput(false);
    }
  }, [notification, setOpen, showPartialInput]);

  const rejectRequest = useCallback(async () => {
    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
    try {
      const response = await rejectRequestNotification({
        requestId: notification.requestId,
      });

      if (response?.success) {
        toast.success("تم الرفض بنجاح.", { id });
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة.", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
      setShowPartialInput(false);
    }
  }, [notification, setOpen]);

  return (
    <div className="grid gap-4 pt-4">
      {showPartialInput && (
        <Input
          ref={ref}
          type="number"
          placeholder="أدخل القيمة المتبقية"
          className="rounded border p-2"
          min="0"
          autoFocus
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Button onClick={handleFullAcceptance}>قبول كلي</Button>
        <Button onClick={handlePartialAcceptance}>
          {showPartialInput ? "تأكيد القبول الجزئي" : "قبول جزئي"}
        </Button>
      </div>

      <Button variant="outline" onClick={rejectRequest}>
        رفض
      </Button>
    </div>
  );
}

function RequestStockConfirmDialogContent({
  notification,
  setOpen,
}: {
  notification: Notification;
  setOpen: (open: boolean) => void;
}) {
  const approveRequest = useCallback(async () => {
    if (!notification.requestStockId) return;
    const id = toast.loading("جاري المعالجة...");
    try {
      const response = await approveRequestStockNotification({
        requestStockId: notification.requestStockId,
      });

      if (response?.success) {
        toast.success("تمت الموافقة بنجاح.", { id });
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, { id });
      }
    } catch (error) {
      toast.error("حدث خطأ ما أثناء المعالجة.", { id });
    } finally {
      setOpen(false);
    }
  }, [notification, setOpen]);
  const rejectRequest = useCallback(async () => {
    const id = toast.loading("جاري المعالجة...");
    if (!notification.requestStockId) return;
    try {
      const response = await rejectRequestStockNotification({
        requestStockId: notification.requestStockId,
      });

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
  }, [notification, setOpen]);
  return (
    <div className="grid gap-4 pt-4 md:grid-cols-2">
      <Button variant="outline" onClick={rejectRequest}>
        لا
      </Button>
      <Button onClick={approveRequest}>نعم</Button>
    </div>
  );
}
