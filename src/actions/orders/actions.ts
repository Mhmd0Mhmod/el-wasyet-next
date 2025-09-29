"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { OrderFormValues } from "@/schema/order";
import { Order } from "@/types/order";

export async function createOrder(
  formData: OrderFormValues,
): Promise<APIResponse<Order | null>> {
  try {
    const res = await authFetch.post<APIResponse<Order>>(
      "Order/create",
      formData,
    );
    return res.data;
  } catch (err) {
    return handleErrorResponse(err);
  }
}
export async function updateOrder(
  id: number,
  formData: OrderFormValues,
): Promise<APIResponse<Order | null>> {
  try {
    const res = await authFetch.put<APIResponse<Order>>(
      `Order/update/${id}`,
      formData,
    );
    return res.data;
  } catch (err) {
    return handleErrorResponse(err);
  }
}
