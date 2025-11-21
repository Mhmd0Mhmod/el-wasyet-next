import { authFetch } from "@/lib/axios";
import { DateRange } from "@/types/filter";

export async function ExportDailyReport(params: DateRange) {
  try {
    const { data: blob } = await authFetch.get<Blob>("/Report/daily/export", {
      responseType: "blob",
      params,
    });

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
export async function ExportDetailedDailyReport(
  params: DateRange & {
    branchId?: string;
    employeeId?: string;
    page: string;
  },
) {
  try {
    const { data: blob } = await authFetch.get<Blob>("/Report/daily/export", {
      params,
      responseType: "blob",
    });

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
export async function ExportExecutiveReport(params: DateRange) {
  try {
    const { data: blob } = await authFetch.get<Blob>(
      "/Report/Advanced/export",
      {
        params,
        responseType: "blob",
      },
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
