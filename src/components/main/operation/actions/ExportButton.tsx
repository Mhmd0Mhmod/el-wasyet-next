"use client";
import { handleErrorResponse } from "@/actions/helper";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/axios";
import { CloudDownload } from "lucide-react";
import { toast } from "sonner";
async function exportOrders(
  params: {
    orderStatusIds: number[];
    IsCertificate?: boolean | null;
    searchTerm?: string;
    pageNumber?: number;
    serviceId?: string;
  },
  name: string,
) {
  try {
    const { data } = await authFetch.get("OperationLog/Orders/Export", {
      params,
      responseType: "blob",
    });
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${name}_${timestamp}.xlsx`;
    const url = URL.createObjectURL(data);
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: filename,
    });

    link.click();
    URL.revokeObjectURL(url);
    return { success: true, data: undefined };
  } catch (err) {
    return handleErrorResponse(err);
  }
}

function ExportButton({
  params,
  name,
}: {
  params: {
    orderStatusIds: number[];
    IsCertificate?: boolean | null;
    searchTerm?: string;
    pageNumber?: number;
    serviceId?: string;
  };
  name: string;
}) {
  const handleDownload = async () => {
    const id = toast.loading("جاري التصدير...");
    try {
      const response = (await exportOrders(
        params,
        name,
      )) as APIResponse<undefined>;

      if (response && !response.success) {
        toast.error(response.message || "حدث خطأ أثناء التصدير", { id });
        return;
      }

      toast.success("تم التصدير بنجاح", { id });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("حدث خطأ أثناء التصدير", { id });
    }
  };

  return (
    <Button onClick={handleDownload}>
      <CloudDownload />
      تصدير
    </Button>
  );
}

export default ExportButton;
