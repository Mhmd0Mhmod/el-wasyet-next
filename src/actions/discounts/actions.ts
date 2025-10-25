"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";

export async function CashBoxTransfer(): Promise<APIResponse> {
  try {
    await authFetch.post("Request/CashBoxTransfer");
    return { success: true, data: undefined };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
