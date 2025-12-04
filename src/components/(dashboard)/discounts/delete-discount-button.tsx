"use client";
import { deleteOffer } from "@/actions/discounts/actions";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "sonner";
function DeleteDiscountButton({ discountId }: { discountId: number }) {
  const onClick = useCallback(async () => {
    const id = toast.loading("جاري الحذف...");
    try {
      const response = await deleteOffer(discountId);
      if (response.success) {
        toast.success("تم الحذف بنجاح", { id });
      } else {
        toast.error(response.message || "فشل في الحذف", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء الحذف", { id });
    }
  }, [discountId]);
  return (
    <Button variant="destructive" onClick={onClick}>
      حذف
    </Button>
  );
}
export default DeleteDiscountButton;
