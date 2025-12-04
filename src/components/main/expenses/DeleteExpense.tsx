"use client";
import { deleteExpense } from "@/actions/expenses/action";
import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  useCallback,
} from "react";
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
  if (!isValidElement(children)) {
    throw new Error("Child must be a valid React element");
  }
  return cloneElement(children, {
    onClick: handleDelete,
  } as ButtonHTMLAttributes<HTMLButtonElement>);
}
export default DeleteExpense;
