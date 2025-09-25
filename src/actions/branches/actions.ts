"use server";
import { AxiosError } from "axios";
import { authFetch } from "@/lib/axios";
import { branchSchema } from "@/schema/branch";
import { BranchFormData } from "@/schema/branch";
import { Branch } from "@/types/branch";
import { revalidatePath } from "next/cache";

export async function createBranch(formData: BranchFormData): Promise<Branch> {
  try {
    const parseResult = await branchSchema.parseAsync(formData);
    const { data } = await authFetch.post<Branch>("Branch/create", parseResult);

    if (data) {
      revalidatePath("/branches");
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while creating branch");
  }
}

export async function updateBranch(
  id: number,
  formData: BranchFormData,
): Promise<Branch> {
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

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while updating branch");
  }
}
