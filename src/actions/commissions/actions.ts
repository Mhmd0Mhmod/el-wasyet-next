"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { revalidatePath } from "next/cache";

export async function createCommission(
  data: Partial<Commission>,
): Promise<APIResponse> {
  try {
    await authFetch.post<APIResponse>("Commission/role", data);
    revalidatePath("/commissions");
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function updateCommission(
  data: Partial<Commission>,
): Promise<APIResponse> {
  try {
    const roleId = data.roleId;
    if (!roleId) {
      return {
        success: false,
        message: "Role ID is required",
      };
    }
    await authFetch.put<APIResponse>(
      `Commission/EditRoleCommission/${data.id}`,
      data,
    );
    revalidatePath("/commissions");
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function deleteCommission(roleId: string): Promise<APIResponse> {
  try {
    await authFetch.delete<APIResponse>(`Commission/role/${roleId}`);
    revalidatePath("/commissions");
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
