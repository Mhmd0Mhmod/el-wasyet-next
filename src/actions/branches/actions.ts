"use server";
import { fetchClient } from "@/lib/fetch";
import { branchSchema } from "@/schema/branch";
import { BranchFormData } from "@/schema/branch";
import { Branch } from "@/types/branch";
import { revalidatePath } from "next/cache";

export async function createBranch(formData: BranchFormData) {
    const parseResult = await branchSchema.parseAsync(formData);
    const response = await fetchClient.post<Branch>("Branch/create", {
        body: parseResult,
    });
    if(!response.error){
        revalidatePath("/branches");
    }

    return response;
}

export async function updateBranch(id: number, formData: BranchFormData) {
    const parseResult = await branchSchema.parseAsync(formData);
    const response = await fetchClient.put<Branch>(`Branch/update/${id}`, {
        body: { id, ...parseResult },   
    });
    if(!response.error){
        revalidatePath(`/branches`);
        revalidatePath(`/branches/${id}`);
    }
    return response;
}
