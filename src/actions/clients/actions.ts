"use server";

import { authFetch } from "@/lib/axios";
import { clientFormSchema, ClientFormValues } from "@/schema/client";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function createClient(data: ClientFormValues) {
  try {
    const body = await clientFormSchema.parseAsync(data);
    const res = await authFetch.post("/Auth/register/client", body);
    revalidatePath("/clients");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Unexpected Error");
  }
}

export async function updateClient(data: ClientFormValues) {
  try {
    const body = await clientFormSchema.parseAsync(data);
    const res = await authFetch.put(`/Auth/edit/client`, body);
    revalidatePath("/clients");
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        Object.values(error.response?.data.errors || {}).join(", ") ||
          error.message,
      );
    }
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Unexpected Error");
  }
}
