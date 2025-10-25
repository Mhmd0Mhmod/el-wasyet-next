import { ReportsFormValues } from "@/components/(dashboard)/dashboard/reports-form";
import { authFetch } from "@/lib/axios";

export async function ActivityReportExcelExport(
  filter: ReportsFormValues,
): Promise<void> {
  try {
    const { data: blob } = await authFetch.get<Blob>(
      "ActivityReport/export-excel",
      { responseType: "blob", params: filter },
    );
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `تقرير_الطلبات_الداخلية_${timestamp}.xlsx`;
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });

    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
}
