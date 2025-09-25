"use server";

import { AxiosError } from "axios";
import { authFetch } from "@/lib/axios";
import { ServiceValues } from "@/schema/service";
import { Service } from "@/types/service";
import { revalidatePath } from "next/cache";

export async function createService(service: ServiceValues): Promise<Service> {
  try {
    const { data } = await authFetch.post<Service>("Service/create", service);

    if (data) {
      revalidatePath("/services");
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while creating service");
  }
}

export async function updateService(
  service: ServiceValues,
  id: number,
): Promise<Service> {
  try {
    const { data } = await authFetch.put<Service>(
      `Service/update/${id}`,
      service,
    );

    if (data) {
      revalidatePath("/services");
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while updating service");
  }
}
