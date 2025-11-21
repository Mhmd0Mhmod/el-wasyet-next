"use server";

import { handleErrorResponse } from "@/actions/helper";
import { authFetch } from "@/lib/axios";
import { ClientFormValues } from "@/schema/client";
import { Client } from "@/types/client";
import { revalidatePath } from "next/cache";

export async function createClient(
  data: ClientFormValues,
): Promise<APIResponse<Client>> {
  try {
    const res = await authFetch.post("/Auth/register/client", data);
    revalidatePath("/clients");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function updateClient(
  data: ClientFormValues,
): Promise<APIResponse<Client>> {
  try {
    const res = await authFetch.put(`/Auth/edit/client`, data);
    revalidatePath("/clients");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function convertToMainClient(
  clientId: number,
): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.get(
      `/Client/makeChildClientAsParent/${clientId}`,
    );
    revalidatePath("/clients");
    return {
      success: true,
      message: response.data,
      data: undefined,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
