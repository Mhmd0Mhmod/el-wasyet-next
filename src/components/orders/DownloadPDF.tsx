"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

function DownloadPDF({ orderId }: { orderId: number }) {
  const onDownloadPDF = async () => {
    const id = toast.loading("جاري تجهيز ملف PDF ...");

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

      if (!response.ok) throw new Error("فشل تحميل ملف PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast.success("تم تحميل ملف PDF بنجاح", { id });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "حدث خطأ ما", { id });
      }
    } finally {
      toast.dismiss(id);
    }
  };
  return (
    <Button
      variant="outline"
      className="border-green-600 text-green-600 hover:bg-green-50"
      onClick={onDownloadPDF}
    >
      <Download className="ml-2 h-4 w-4" />
      تحميل PDF
    </Button>
  );
}
export default DownloadPDF;
