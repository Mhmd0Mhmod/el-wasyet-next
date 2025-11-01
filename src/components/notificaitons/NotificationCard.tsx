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
import { useCallback, useRef, useState, useTransition } from "react";
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
  const [notificationState, setNotificationState] = useState(notification);

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
function RequestConfirmDialogContent({
  notification: notificationState,
  setOpen,
  setNotificationState,
}: {
  notification: Notification;
  setOpen: (open: boolean) => void;
  setNotificationState: React.Dispatch<React.SetStateAction<Notification>>;
}) {
  const notification = notificationState;
  const [, startTransition] = useTransition();
  const [showPartialInput, setShowPartialInput] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFullAcceptance = useCallback(() => {
    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      approveRequestNotification({
        requestId: notification.requestId!,
        notificationId: notification.notificationId,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تمت الموافقة بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, {
              id,
            });
            // Revert to unread if failed
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          // Revert to unread if failed
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
        });
    });
  }, [notification, setOpen, setNotificationState]);

  const handlePartialAcceptance = useCallback(() => {
    if (!showPartialInput) {
      setShowPartialInput(true);
      return;
    }

    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
    const remainingValue = parseInt(ref?.current?.value || "0");

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      approveRequestNotification({
        requestId: notification.requestId!,
        Remainingvalue: remainingValue,
        notificationId: notification.notificationId,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تمت الموافقة بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, {
              id,
            });
            // Revert to unread if failed
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          // Revert to unread if failed
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
          setShowPartialInput(false);
        });
    });
  }, [notification, setOpen, showPartialInput, setNotificationState]);

  const rejectRequest = useCallback(() => {
    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      rejectRequestNotification({
        requestId: notification.requestId!,
        notificationId: notification.notificationId,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تم الرفض بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة.", { id });
            // Revert to unread if failed
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          // Revert to unread if failed
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
          setShowPartialInput(false);
        });
    });
  }, [notification, setOpen, setNotificationState]);

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
  notification: notificationState,
  setOpen,
  setNotificationState,
}: {
  notification: Notification;
  setOpen: (open: boolean) => void;
  setNotificationState: React.Dispatch<React.SetStateAction<Notification>>;
}) {
  const notification = notificationState;
  const [, startTransition] = useTransition();

  const approveRequest = useCallback(() => {
    if (!notification.requestStockId) return;
    const id = toast.loading("جاري المعالجة...");

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      approveRequestStockNotification({
        requestStockId: notification.requestStockId!,
        notificationId: notification.notificationId,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تمت الموافقة بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message, {
              id,
            });
            // Revert to unread if failed
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          // Revert to unread if failed
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
        });
    });
  }, [notification, setOpen, setNotificationState]);
  const rejectRequest = useCallback(() => {
    if (!notification.requestStockId) return;
    const id = toast.loading("جاري المعالجة...");

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      rejectRequestStockNotification({
        requestStockId: notification.requestStockId!,
        notificationId: notification.notificationId,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تمت الموافقة بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة.", { id });
            // Revert to unread if failed
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          // Revert to unread if failed
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
        });
    });
  }, [notification, setOpen, setNotificationState]);
  return (
    <div className="grid gap-4 pt-4 md:grid-cols-2">
      <Button variant="outline" onClick={rejectRequest}>
        لا
      </Button>
      <Button onClick={approveRequest}>نعم</Button>
    </div>
  );
}
