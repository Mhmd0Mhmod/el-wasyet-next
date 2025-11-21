"use client";
import { Button } from "@/components/ui/button";
import { OrderByStatus } from "@/types/order";
import { CloudDownload } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

function ExportButton({ orders }: { orders: OrderByStatus[] }) {
  const handleDownload = () => {
    const id = toast.loading("جاري التصدير...");
    try {
      if (orders.length === 0) {
        toast.error("لا توجد بيانات للتصدير", { id });
        return;
      }

      // Convert data to CSV with proper formatting
      const csv = Papa.unparse(orders, {
        header: true,
      });

      // Add BOM for proper UTF-8 encoding in Excel
      const BOM = "\uFEFF";
      const csvWithBOM = BOM + csv;

      // Create blob with proper Excel MIME type
      const blob = new Blob([csvWithBOM], {
        type: "text/csv;charset=utf-8;",
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("تم التصدير بنجاح", { id });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("حدث خطأ أثناء التصدير", { id });
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
