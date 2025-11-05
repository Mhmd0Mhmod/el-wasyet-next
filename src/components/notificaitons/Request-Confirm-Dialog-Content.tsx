"use client";
import {
  approveRequestNotification,
  rejectRequestNotification,
} from "@/actions/notifications/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notification } from "@/types/notification";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

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
  const [showRejectInput, setShowRejectInput] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const rejectReasonRef = useRef<HTMLInputElement>(null);
  const handleFullAcceptance = useCallback(() => {
    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
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
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
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
    const remainingValue = parseFloat(ref?.current?.value || "0");
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
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
          setShowPartialInput(false);
        });
    });
  }, [notification, setOpen, showPartialInput, setNotificationState]);

  const rejectRequest = useCallback(() => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }

    if (!notification.requestId) return;
    const id = toast.loading("جاري المعالجة...");
    const reason = rejectReasonRef?.current?.value || "";

    // Optimistically mark as read
    setNotificationState((prev) => ({ ...prev, isRead: true }));

    startTransition(() => {
      rejectRequestNotification({
        requestId: notification.requestId!,
        notificationId: notification.notificationId,
        reason,
      })
        .then((response) => {
          if (response?.success) {
            toast.success("تم الرفض بنجاح.", { id });
          } else {
            toast.error("حدث خطأ ما أثناء المعالجة.", { id });
            setNotificationState((prev) => ({ ...prev, isRead: false }));
          }
        })
        .catch(() => {
          toast.error("حدث خطأ ما أثناء المعالجة.", { id });
          setNotificationState((prev) => ({ ...prev, isRead: false }));
        })
        .finally(() => {
          setOpen(false);
          setShowPartialInput(false);
          setShowRejectInput(false);
        });
    });
  }, [notification, setOpen, setNotificationState, showRejectInput]);

  return (
    <div className="grid gap-4 pt-4">
      {showPartialInput && !showRejectInput && (
        <Input
          ref={ref}
          type="number"
          step={"any"}
          placeholder="أدخل القيمة المتبقية"
          className="rounded border p-2"
          min="0"
          autoFocus
        />
      )}

      {showRejectInput && !showPartialInput && (
        <Input
          ref={rejectReasonRef}
          type="text"
          placeholder="أدخل سبب الرفض"
          className="rounded border p-2"
          autoFocus
        />
      )}

      {!showRejectInput && (
        <div className="grid gap-4 md:grid-cols-2">
          <Button onClick={handleFullAcceptance}>قبول كلي</Button>
          <Button onClick={handlePartialAcceptance}>
            {showPartialInput ? "تأكيد القبول الجزئي" : "قبول جزئي"}
          </Button>
        </div>
      )}

      {showRejectInput ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Button variant="outline" onClick={() => setShowRejectInput(false)}>
            رجوع
          </Button>
          <Button variant="destructive" onClick={rejectRequest}>
            تأكيد الرفض
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={rejectRequest}>
          رفض
        </Button>
      )}
    </div>
  );
}

export default RequestConfirmDialogContent;
