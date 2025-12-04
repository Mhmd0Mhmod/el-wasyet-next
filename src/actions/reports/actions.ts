"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { RefundOrderInput } from "@/schema/refund-order";

export async function refundOrder(
  data: RefundOrderInput,
): Promise<APIResponse> {
  try {
    const response = await authFetch.post<APIResponse>(
      "OperationLog/refund-order-process",
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
export async function CancelOrderWithoutForm(
  data: Partial<RefundOrderInput>,
): Promise<APIResponse> {
  try {
    const response = await authFetch.post<APIResponse>(
      "OperationLog/cancellation-without-forms",
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
export async function CancelOrderWithForm(
  data: Partial<RefundOrderInput>,
): Promise<APIResponse> {
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
