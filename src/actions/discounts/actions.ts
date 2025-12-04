"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { Offer } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function CashBoxTransfer(): Promise<APIResponse> {
  try {
    await authFetch.post("Request/CashBoxTransfer");
    return { success: true, data: undefined };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function createOffer(data: Partial<Offer>): Promise<APIResponse> {
  try {
    await authFetch.post("Offer/create", data);
    revalidatePath("/discounts");
    return { success: true, data: undefined };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function updateOffer(data: Partial<Offer>): Promise<APIResponse> {
  try {
    await authFetch.put(`Offer/edit`, data);
    revalidatePath("/discounts");
    return { success: true, data: undefined };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function deleteOffer(offerId: number): Promise<APIResponse> {
  try {
    await authFetch.delete(`Offer/delete/${offerId}`);
    revalidatePath("/discounts");
    return { success: true, data: undefined };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
