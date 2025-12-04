"use client";
import { authFetch } from "@/lib/axios";
import { CloudDownload } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type ExportButtonProps = {
  url: string;
  params?: Record<string, string | number | boolean>;
};
function ExportButton({ url, params }: ExportButtonProps) {
  const onClick = useCallback(async () => {
    const id = toast.loading("جاري تجهيز الملف...");
    try {
      const { data: blob } = await authFetch.get<Blob>(url, {
        params,
        responseType: "blob",
      });

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `تقرير_الطلبات_الداخلية_${timestamp}.xlsx`;
      const fileUrl = URL.createObjectURL(blob);
      const link = Object.assign(document.createElement("a"), {
        href: fileUrl,
        download: filename,
      });

      link.click();
      URL.revokeObjectURL(fileUrl);
      toast.success("تم تجهيز الملف بنجاح", { id });
    } catch {
      toast.error("حدث خطأ أثناء تجهيز الملف", { id });
    }
  }, [url, params]);
  return (
    <Button onClick={onClick}>
      <CloudDownload className="mr-2 h-4 w-4" />
      تصدير
    </Button>
  );
}
export default ExportButton;
