"use client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";

function ExportReceiptButton({ orderId }: { orderId: number }) {
  const onExportReceipt = async () => {
    const id = toast.loading("جاري تجهيز الفاتورة ...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Invoice/order/${orderId}/pdf`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="report.pdf" ',
          },
        },
      );

      if (!response.ok) throw new Error("فشل تحميل الفاتورة");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast.success("تم تصدير الفاتورة بنجاح", { id });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "حدث خطأ ما", { id });
      }
    } finally {
      toast.dismiss(id);
    }
  };

  return (
    <Button onClick={onExportReceipt} disabled={!orderId}>
      <Printer className="ml-2 h-4 w-4" />
      طباعة الفاتورة
    </Button>
  );
}

export default ExportReceiptButton;
