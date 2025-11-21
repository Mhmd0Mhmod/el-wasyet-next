"use client";
import { ExportDetailedDailyReport } from "@/actions/reports/actions-client";
import { Button } from "@/components/ui/button";
import { DateRange } from "@/types/filter";
import { CloudDownload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
function ExportDetailsDailyReportsButton({
  params,
}: {
  params: DateRange & {
    branchId?: string;
    employeeId?: string;
    page: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = useCallback(async () => {
    setIsLoading(true);
    const id = toast.loading("جاري تجهيز التقرير...");
    try {
      await ExportDetailedDailyReport(params);
      toast.success("تم تنزيل التقرير بنجاح", { id });
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("حدث خطأ أثناء تنزيل التقرير", { id });
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <Button onClick={handleExport} disabled={isLoading}>
      <CloudDownload size={16} />
      تصدير
    </Button>
  );
}
export default ExportDetailsDailyReportsButton;
