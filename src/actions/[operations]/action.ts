"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { getCurrentUser } from "../auth/actions";

export async function sendCode(orderId: number): Promise<APIResponse<null>> {
  try {
    const employeeId = (await getCurrentUser())?.user.id;
    const body = { orderId, employeeId };
    const { data } = await authFetch.post(
      "OperationLog/send-receipt-code",
      body,
    );
    if (data.success) {
      return { success: true, data: null };
    } else {
      return {
        success: false,
        message: data.message || "حدث خطأ ما",
      };
    }
  } catch (err) {
    return handleErrorResponse(err);
  }
}
