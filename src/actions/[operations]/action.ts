"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";

export async function sendCode(data: {
  orderId: number;
  employeeId: number;
}): Promise<APIResponse<null>> {
  try {
    const response = await authFetch.post(
      "OperationLog/send-receipt-code",
      data,
    );
    return {
      data: null,
      message: response.data.message,
      success: true,
    };
  } catch (err) {
    return handleErrorResponse(err);
  }
}
