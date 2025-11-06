"use client";
import {
  approveRequestStockNotification,
  rejectRequestStockNotification,
} from "@/actions/notifications/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notification } from "@/types/notification";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

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
  const [showRejectInput, setShowRejectInput] = useState(false);
  const rejectReasonRef = useRef<HTMLInputElement>(null);

  const approveRequest = useCallback(() => {
    if (!notification.requestStockId) return;
    const id = toast.loading("جاري المعالجة...");
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
            setNotificationState({ ...notification });
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          setNotificationState({ ...notification });
        })
        .finally(() => {
          setOpen(false);
        });
    });
  }, [notification, setOpen, setNotificationState]);
  const rejectRequest = useCallback(() => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }

    if (!notification.requestStockId) return;
    const id = toast.loading("جاري المعالجة...");
    const reason = rejectReasonRef?.current?.value || "";
    setNotificationState((prev) => ({ ...prev, isRead: true }));
    startTransition(() => {
      rejectRequestStockNotification({
        requestStockId: notification.requestStockId!,
        notificationId: notification.notificationId,
        reason,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تم الرفض بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة.", { id });
            setNotificationState({ ...notification });
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          setNotificationState({ ...notification });
        })
        .finally(() => {
          setOpen(false);
          setShowRejectInput(false);
        });
    });
  }, [notification, setOpen, setNotificationState, showRejectInput]);
  return (
    <div className="grid gap-4 pt-4">
      {showRejectInput && (
        <Input
          ref={rejectReasonRef}
          type="text"
          placeholder="أدخل سبب الرفض"
          className="rounded border p-2"
          autoFocus
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {showRejectInput ? (
          <>
            <Button variant="outline" onClick={() => setShowRejectInput(false)}>
              رجوع
            </Button>
            <Button variant="destructive" onClick={rejectRequest}>
              تأكيد الرفض
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={rejectRequest}>
              لا
            </Button>
            <Button onClick={approveRequest}>نعم</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default RequestStockConfirmDialogContent;
