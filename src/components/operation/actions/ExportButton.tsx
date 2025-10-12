"use client";
import { Button } from "@/components/ui/button";
import { OrderByStatus } from "@/types/order";
import { CloudDownload } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
function ExportButton({ orders }: { orders: OrderByStatus[] }) {
  const handleDownload = () => {
    const id = toast.loading(" جاري التحميل...");
    try {
      if (orders.length === 0) {
        toast.error("لا توجد بيانات للتصدير", { id });
        return;
      }
      const csv = Papa.unparse(orders);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("تم التحميل بنجاح", { id });
    } catch (_error) {
      toast.error("حدث خطأ أثناء التحميل", { id });
    } finally {
      toast.dismiss(id);
    }
  };
  return (
    <Button onClick={handleDownload} disabled={orders.length === 0}>
      <CloudDownload />
      تصدير
    </Button>
  );
}
export default ExportButton;
