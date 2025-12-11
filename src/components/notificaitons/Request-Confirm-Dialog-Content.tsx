"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/components/providers/NotficationsProvider";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function RequestConfirmDialogContent({
  notification,
  setOpen,
}: {
  notification: Notification;
  setOpen: (open: boolean) => void;
}) {
  const [dialog, setDialog] = useState<"selecting" | "reason" | "partial">(
    "selecting",
  );

  const { confirmFullAcceptanceNotificationRequest, markAsRead } =
    useNotifications();

  const handleFullAcceptance = useCallback(async () => {
    markAsRead(notification.notificationId);
    setOpen(false);

    try {
      const response =
        await confirmFullAcceptanceNotificationRequest(notification);
      if (response?.success) {
        toast.success("تمت الموافقة بنجاح.");
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة: " + response?.message);
      }
    } catch {
      toast.error("حدث خطأ ما أثناء المعالجة.");
    }
  }, [
    confirmFullAcceptanceNotificationRequest,
    notification,
    setOpen,
    markAsRead,
  ]);

  if (dialog === "reason") {
    return (
      <RejectReasonForm
        notification={notification}
        returnToSelectMode={() => setDialog("selecting")}
        setOpen={setOpen}
      />
    );
  }

  if (dialog === "partial") {
    return (
      <ApprovalPartialForm
        notification={notification}
        returnToSelectMode={() => setDialog("selecting")}
        setOpen={setOpen}
      />
    );
  }

  const cantPartial =
    notification.message.includes("رد مصاريف") ||
    notification.message.includes("تحصيل مصاريف");
  console.log(cantPartial);

  return (
    <div className="grid gap-4 pt-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button className="grow" onClick={handleFullAcceptance}>
          قبول كلي
        </Button>
        {!cantPartial && (
          <Button className="grow" onClick={() => setDialog("partial")}>
            قبول جزئي
          </Button>
        )}
      </div>
      <Button variant="outline" onClick={() => setDialog("reason")}>
        رفض
      </Button>
    </div>
  );
}

function ApprovalPartialForm({
  notification,
  returnToSelectMode,
  setOpen,
}: {
  notification: Notification;
  returnToSelectMode: () => void;
  setOpen: (open: boolean) => void;
}) {
  const [remainingValue, setRemainingValue] = useState("");
  const { confirmPartialAcceptanceNotificationRequest, markAsRead } =
    useNotifications();

  const handlePartialAcceptance = useCallback(async () => {
    if (!remainingValue || parseFloat(remainingValue) <= 0) {
      toast.error("يرجى إدخال قيمة صحيحة");
      return;
    }

    markAsRead(notification.notificationId);
    setOpen(false);

    try {
      const response = await confirmPartialAcceptanceNotificationRequest(
        notification,
        remainingValue,
      );
      if (response.success) {
        toast.success("تمت الموافقة بنجاح.");
      } else {
        toast.error("حدث خطأ ما أثناء المعالجة: " + response.message);
      }
    } catch {
      toast.error("حدث خطأ ما أثناء المعالجة.");
    }
  }, [
    confirmPartialAcceptanceNotificationRequest,
    notification,
    remainingValue,
    setOpen,
    markAsRead,
  ]);

  return (
    <div className="grid gap-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="remainingValue">القيمة المتبقية</Label>
        <Input
          id="remainingValue"
          value={remainingValue}
          onChange={(e) => setRemainingValue(e.target.value)}
          type="text"
          placeholder="أدخل القيمة المتبقية"
          className="rounded border p-2"
          autoFocus
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <Button variant="outline" onClick={returnToSelectMode}>
          رجوع
        </Button>
        <Button onClick={handlePartialAcceptance}>تأكيد القبول الجزئي</Button>
      </div>
    </div>
  );
}

function RejectReasonForm({
  notification,
  returnToSelectMode,
  setOpen,
}: {
  notification: Notification;
  returnToSelectMode: () => void;
  setOpen: (open: boolean) => void;
}) {
  const [reason, setReason] = useState("");
  const { rejectNotificationRequest, markAsRead } = useNotifications();

  const rejectRequest = useCallback(async () => {
    if (!reason.trim()) {
      toast.error("يرجى إدخال سبب الرفض");
      return;
    }

    markAsRead(notification.notificationId);
    setOpen(false);

    try {
      const response = await rejectNotificationRequest(notification, reason);
      if (response.success) {
        toast.success("تم الرفض بنجاح.");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ ما أثناء المعالجة.");
    }
  }, [rejectNotificationRequest, notification, reason, setOpen, markAsRead]);

  return (
    <div className="grid gap-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="rejectReason">سبب الرفض</Label>
        <Input
          id="rejectReason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          type="text"
          placeholder="أدخل سبب الرفض"
          className="rounded border p-2"
          autoFocus
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <Button variant="outline" onClick={returnToSelectMode}>
          رجوع
        </Button>
        <Button variant="destructive" onClick={rejectRequest}>
          تأكيد الرفض
        </Button>
      </div>
    </div>
  );
}

export default RequestConfirmDialogContent;
