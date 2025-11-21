"use client";
import { convertToMainClient } from "@/actions/clients/actions";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

function ConvertToMainClientButton({
  clientId,
  onConvert,
}: {
  clientId: number;
  onConvert?: () => void;
}) {
  const onClick = useCallback(async () => {
    const id = toast.loading("جاري التحويل إلى عميل رئيسي...");
    try {
      const response = await convertToMainClient(clientId);
      if (response.success) {
        toast.success(response.message || "تم التحويل إلى عميل رئيسي بنجاح", {
          id,
        });
        onConvert?.();
      } else {
        toast.error(response.message || "فشل التحويل إلى عميل رئيسي", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع أثناء التحويل" + error, { id });
    }
  }, [clientId]);
  return (
    <Button variant="destructive" onClick={onClick}>
      <Users className="ml-2" />
      تحويل إلى عميل رئيسي
    </Button>
  );
}
export default ConvertToMainClientButton;
