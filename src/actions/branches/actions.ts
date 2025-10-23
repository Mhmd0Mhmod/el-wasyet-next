"use server";
import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/lib/helper";
import { BranchFormData, branchSchema } from "@/schema/branch";
import { Branch } from "@/types/branch";
import { revalidatePath } from "next/cache";

export async function createBranch(
  formData: BranchFormData,
): Promise<APIResponse<Branch>> {
  try {
    const parseResult = await branchSchema.parseAsync(formData);
    const { data } = await authFetch.post<Branch>("Branch/create", parseResult);

    if (data) {
      revalidatePath("/branches");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function updateBranch(
  id: number,
  formData: BranchFormData,
): Promise<APIResponse<Branch | null>> {
  try {
    const parseResult = await branchSchema.parseAsync(formData);
    const { data } = await authFetch.put<Branch>(`Branch/update/${id}`, {
      id,
      ...parseResult,
    });

    if (data) {
      revalidatePath(`/branches`);
      revalidatePath(`/branches/${id}`);
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
