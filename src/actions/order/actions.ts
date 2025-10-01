"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { OrderFormValues } from "@/schema/order";
import { Order } from "@/types/order";

export async function createOrder(
  data: OrderFormValues,
): Promise<APIResponse<Order | null>> {
  try {
    const res = await authFetch.post<Order>("/Order/create", data);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
