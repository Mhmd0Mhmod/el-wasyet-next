"use client";
import { CashBoxTransfer } from "@/actions/discounts/actions";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "sonner";

function AccountTransactionActions() {
  const handleConfirm = useCallback(async () => {
    const id = toast.loading("جاري تأكيد طلب التحويل...");
    try {
      const res = await CashBoxTransfer();
      if (res.success) {
        toast.success("تم تأكيد طلب التحويل بنجاح", { id });
      } else {
        toast.error(`حدث خطأ: ${res.message}`, { id });
      }
    } catch (error) {
      toast.error(`حدث خطأ: ${error}`, { id });
    }
  }, []);

  return (
    <>
      <AlertDialogAction asChild onClick={handleConfirm}>
        <Button>تأكيد</Button>
      </AlertDialogAction>
      <AlertDialogCancel asChild>
        <Button variant="outline">إلغاء</Button>
      </AlertDialogCancel>
    </>
  );
}
export default AccountTransactionActions;
