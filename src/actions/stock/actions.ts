"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { StockItemFormSchema } from "@/types/stock-item";
import { revalidatePath } from "next/cache";

export async function createNewStockItem(
  data: StockItemFormSchema,
): Promise<APIResponse> {
  try {
    const response = await authFetch.post("/Stock/create", data);
    revalidatePath(`/stock/${data.branchId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function transferConvenant(employeeId: string) {
  try {
    const response = await authFetch.post("/RequestStock", undefined, {
      params: {
        toEmployeeId: employeeId,
      },
    });
    revalidatePath("/stock");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
