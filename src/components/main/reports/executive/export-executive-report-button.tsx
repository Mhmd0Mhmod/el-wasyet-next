"use client";
import { ExportExecutiveReport } from "@/actions/reports/actions-client";
import { Button } from "@/components/ui/button";
import { DateRange } from "@/types/filter";
import { CloudDownload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function ExportExecutiveReportButton({ params }: { params: DateRange }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = useCallback(async () => {
    setIsLoading(true);
    const id = toast.loading("جاري تجهيز التقرير...");
    try {
      await ExportExecutiveReport(params);
      toast.success("تم تنزيل التقرير بنجاح", { id });
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("حدث خطأ أثناء تنزيل التقرير", { id });
    } finally {
      setIsLoading(false);
    }
  }, [params]);
  return (
    <Button onClick={handleExport} disabled={isLoading}>
      <CloudDownload size={16} />
      تصدير
    </Button>
  );
}
export default ExportExecutiveReportButton;
