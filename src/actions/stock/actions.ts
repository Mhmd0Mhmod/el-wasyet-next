"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { NewFormTypeForm } from "@/schema/new-form-type";
import { StockItemForm } from "@/schema/stock-item-form";
import { revalidatePath } from "next/cache";

export async function createNewStockItem(
  data: StockItemForm,
): Promise<APIResponse> {
  try {
    const response = await authFetch.post("/Stock/AddFormInStock", data);
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
export async function updateStockItem(
  data: StockItemForm,
): Promise<APIResponse> {
  try {
    const response = await authFetch.put("/Stock/UpdateFormInStock", data);
    revalidatePath(`/stock/${data.branchId}`);
    revalidatePath("/stock");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function addNewFormType(
  data: NewFormTypeForm,
): Promise<APIResponse> {
  try {
    const response = await authFetch.post("/Stock/AddForm", data);
    revalidatePath("/stock");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
