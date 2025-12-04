"use client";
import { SendWhatsAppMessage } from "@/actions/orders/[id]/actions";
import { Button } from "@/components/ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

function WhatsAppShareButton({ orderId }: { orderId: number }) {
  const onClick = useCallback(async () => {
    const id = toast.loading("جاري إرسال الفاتوره عبر واتساب...");
    const res = await SendWhatsAppMessage(orderId);
    if (res.success) {
      toast.success(res.message, { id });
    } else {
      toast.error(`حدث خطأ: ${res.message || "فشل في إرسال الفاتوره."}`, {
        id,
      });
    }
  }, [orderId]);

  return (
    <Button
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
      onClick={onClick}
    >
      <MessageCircleCodeIcon size={24} />
      إرسال الفاتوره عبر واتساب
    </Button>
  );
}
export default WhatsAppShareButton;
