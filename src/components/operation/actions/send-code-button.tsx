"use client";
import { sendCode } from "@/actions/[operations]/action";
import Dialog from "@/components/general/Dialog";
import { Button } from "@/components/ui/button";
import { OrderByStatus } from "@/types/order";
import { ReactNode, useCallback } from "react";
import { toast } from "sonner";
import SendCode from "./send-code";

function SendCodeButton({
  children,
  order,
}: {
  children: ReactNode;
  order: OrderByStatus;
}) {
  const handleClick = useCallback(async () => {
    const id = toast.loading("جاري إرسال الكود...");
    try {
      const res = await sendCode(order.orderId);
      if (res.success) {
        toast.success("تم إرسال الكود بنجاح", { id });
      } else {
        toast.error(res.message || "حدث خطأ أثناء إرسال الكود", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء إرسال الكود", { id });
    }
  }, [order.orderId]);
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="link" onClick={handleClick}>
          {children}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content title="إرسال الكود">
        <div className="max-h-[70vh] space-y-10 overflow-auto">
          <SendCode order={order} />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
export default SendCodeButton;
