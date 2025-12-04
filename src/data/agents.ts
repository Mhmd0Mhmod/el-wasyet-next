import { authFetch } from "@/lib/axios";
import { AgentDetials } from "@/types/agent";
import { Agent } from "@/types/order";

export async function getAgents(search?: string): Promise<Agent[]> {
  try {
    const response = await authFetch.get<Agent[]>("/Agent", {
      params: {
        searchTerm: search || "",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAgentDetailsById({
  id,
  startDate,
  endDate,
}: {
  id: number;
  startDate?: string;
  endDate?: string;
}): Promise<AgentDetials> {
  try {
    const response = await authFetch.get<AgentDetials>(`/Agent/details/${id}`, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
