"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { Agent } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function deleteAgent(agentId: number): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.delete<void>(`/Agent/${agentId}`);
    revalidatePath("/agents");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function updateAgent(
  agentId: number,
  data: Partial<Agent>,
): Promise<APIResponse<Agent>> {
  try {
    const response = await authFetch.put<Agent>(`/Agent/${agentId}`, data);
    revalidatePath("/agents");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function createAgent(
  data: Partial<Agent>,
): Promise<APIResponse<Agent>> {
  try {
    const response = await authFetch.post<Agent>(`/Agent`, data);
    revalidatePath("/agents");
    return { success: true, data: response.data };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
