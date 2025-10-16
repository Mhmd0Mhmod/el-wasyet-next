"use client";
import { sendCode } from "@/actions/[operations]/action";
import { Button } from "@/components/ui/button";
import { OrderByStatus } from "@/types/order";
import { useCallback } from "react";
import { toast } from "sonner";

function SendCodeButton({ order }: { order: OrderByStatus }) {
  const handleClick = useCallback(async () => {
    const id = toast.loading("جاري إرسال الكود...");
    try {
      const res = await sendCode({
        orderId: order.orderId,
        employeeId: order.employeeId,
      });
      if (res.success) {
        toast.success("تم إرسال الكود بنجاح", { id });
      } else {
        toast.error(res.message || "حدث خطأ أثناء إرسال الكود", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الكود", { id });
    } finally {
      toast.dismiss(id);
    }
  }, [order.orderId, order.employeeId]);
  console.log(order);
  return (
    <Button variant={"link"} onClick={handleClick}>
      إرسال الكود
    </Button>
  );
}
export default SendCodeButton;
