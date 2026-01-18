"use client";
import { deleteExpense } from "@/actions/expenses/action";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "sonner";

function DeleteExpense({
  expenseId,
  children,
}: {
  expenseId: number;
  children: React.ReactNode;
}) {
  const handleDelete = useCallback(async () => {
    const id = toast.loading("جاري الحذف...");
    try {
      const response = await deleteExpense(expenseId);
      if (response.success) {
        toast.success("تم حذف المصروف بنجاح", { id });
      } else {
        toast.error(response.message || "حدث خطأ أثناء حذف المصروف", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف المصروف", { id });
    }
  }, [expenseId]);

  return <Button onClick={handleDelete}>{children}</Button>;
}
export default DeleteExpense;
