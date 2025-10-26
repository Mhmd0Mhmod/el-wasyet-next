"use client";
import { deleteCommission } from "@/actions/commissions/actions";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function DeleteCommissionsAction({ roleId }: { roleId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const id = toast.loading("جاري حذف العموله...");
    try {
      const response = await deleteCommission(roleId);
      if (response.success) {
        toast.success("تم حذف العموله بنجاح", { id });
      } else {
        toast.error(response.message || "حدث خطأ أثناء حذف العموله", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف العموله", { id });
    } finally {
      setIsLoading(false);
    }
  }, [roleId]);
  return (
    <Button onClick={onSubmit} disabled={isLoading}>
      حذف العمولة
    </Button>
  );
}
export default DeleteCommissionsAction;
{
}
