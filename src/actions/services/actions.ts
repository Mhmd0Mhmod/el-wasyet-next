"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { ServiceValues } from "@/schema/service";
import { Service } from "@/types/service";
import { revalidatePath } from "next/cache";

export async function createService(
  service: ServiceValues,
): Promise<APIResponse<Service>> {
  try {
    const { data } = await authFetch.post<Service>("Service/create", service);

    if (data) {
      revalidatePath("/services");
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function updateService(
  service: ServiceValues,
  id: number,
): Promise<APIResponse<Service>> {
  try {
    const { data } = await authFetch.put<Service>(
      `Service/update/${id}`,
      service,
    );

    if (data) {
      revalidatePath("/services");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function toggleServiceStatus(
  id: number,
): Promise<APIResponse<null>> {
  try {
    const { data } = await authFetch.put<null>(`/Service/change-status/${id}`);
    revalidatePath("/services");
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
