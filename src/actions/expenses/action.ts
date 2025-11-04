"use server";
import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { ExpenseInput } from "@/schema/expense";
import { getCurrentEmployeeId } from "../auth/actions";
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
    return {
      success: true,
      message: "تم اضافة المصروف بنجاح",
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
