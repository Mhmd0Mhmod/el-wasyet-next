"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { RefundOrderInput } from "@/schema/refund-order";

export async function refundOrder(
  data: RefundOrderInput,
): Promise<APIResponse> {
  console.log(data);

  try {
    const response = await authFetch.post<APIResponse>(
      "OperationLog/cancellation-with-forms",
      data,
    );
    return {
      success: true,
      message: response.data.message,
      data: undefined,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
