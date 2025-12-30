"use client";
import { toggleServiceStatus } from "@/actions/services/actions";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "sonner";

function ToggleServiceStatusAction({
  serviceId,
  suspended,
  children,
}: {
  serviceId: number;
  suspended: boolean;
  children: React.ReactNode;
}) {
  const handleToggleStatus = useCallback(async () => {
    try {
      const response = await toggleServiceStatus(serviceId);
      if (response.success) {
        toast.success(`تم ${suspended ? "تفعيل" : "تعطيل"} الخدمة بنجاح`);
      } else {
        toast.error(
          `فشل في ${suspended ? "تفعيل" : "تعطيل"} الخدمة: ${
            response.message || "حدث خطأ غير متوقع"
          }`,
        );
      }
    } catch (error) {
      toast.error(
        `فشل في ${suspended ? "تفعيل" : "تعطيل"} الخدمة: ${
          error instanceof Error ? error.message : "حدث خطأ غير متوقع"
        }`,
      );
    }
  }, [serviceId, suspended]);
  return (
    <Button asChild onClick={handleToggleStatus}>
      {children}
    </Button>
  );
}
export default ToggleServiceStatusAction;
