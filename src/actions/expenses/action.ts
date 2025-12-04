"use server";
import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { ExpenseInput } from "@/schema/expense";
import { getCurrentEmployeeId } from "../auth/actions";
import { revalidatePath } from "next/cache";
export async function addNewExpense(data: ExpenseInput): Promise<APIResponse> {
  try {
    const employeeId = await getCurrentEmployeeId();
    if (!employeeId) {
      return {
        success: false,
        message: "employeeId غير موجود , يرجى تسجيل الدخول مجددا",
      };
    }
    const response = await authFetch.post("Expense/create", {
      ...data,
      employeeId,
    });
    revalidatePath("/expenses");
    return {
      success: true,
      message: "تم اضافة المصروف بنجاح",
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function deleteExpense(expenseId: number): Promise<APIResponse> {
  try {
    const response = await authFetch.delete(`Expense/delete/${expenseId}`);
    revalidatePath("/expenses");
    return {
      success: true,
      message: "تم حذف المصروف بنجاح",
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
