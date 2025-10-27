import { authFetch } from "@/lib/axios";

export async function ExportDailyReport() {
  try {
    const { data: blob } = await authFetch.get<Blob>("/Report/daily/export", {
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

export async function ExportExecutiveReport() {
  try {
    const { data: blob } = await authFetch.get<Blob>(
      "/Report/executive/export",
      {
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
