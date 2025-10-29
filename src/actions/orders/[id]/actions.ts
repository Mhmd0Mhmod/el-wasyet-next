"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";

export async function SendWhatsAppMessage(
  orderId: number,
): Promise<APIResponse<null>> {
  try {
    const res = await authFetch.post<APIResponse<null>>(
      `Invoice/order/${orderId}/send-whatsapp`,
    );

    return res.data;
  } catch (err) {
    return handleErrorResponse(err);
  }
}
