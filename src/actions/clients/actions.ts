"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { clientFormSchema, ClientFormValues } from "@/schema/client";
import { Client } from "@/types/client";
import { revalidatePath } from "next/cache";

export async function createClient(
  data: ClientFormValues,
): Promise<APIResponse<Client | null>> {
  try {
    const body = await clientFormSchema.parseAsync(data);
    const res = await authFetch.post("/Auth/register/client", body);
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
): Promise<APIResponse<Client | null>> {
  try {
    const body = await clientFormSchema.parseAsync(data);
    const res = await authFetch.put(`/Auth/edit/client`, body);
    revalidatePath("/clients");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
