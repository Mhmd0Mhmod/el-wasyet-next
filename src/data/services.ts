import { Service, ServiceForm, ShortWorkFlow } from "@/types/service";
import { fetchClient } from "../lib/fetch";

export async function getServices(params: { search?: string; page?: string }) {
  const query = new URLSearchParams();
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.page) {
    query.append("page", params.page);
  }
  const response = await fetchClient.get<PaginatedResponse<Service>>(
    "Service/all-services",
  );
  if (response.error || !response.data) {
    throw new Error(response.message || "Failed to fetch services");
  }

  return response;
}

export async function getWorkFlows() {
  const { data, error, message } = await fetchClient.get<ShortWorkFlow[]>(
    "Service/GetDefaultStatus",
  );
  if (error || !data) throw new Error(message || "Failed to fetch workflows");
  return data;
}

export async function getForms() {
  const { data, error, message } =
    await fetchClient.get<ServiceForm[]>("Service/All-Forms");
  if (error || !data) throw new Error(message || "Failed to fetch workflows");
  return data;
}
