import { AxiosError } from "axios";
import { Service, ServiceForm, ShortWorkFlow } from "@/types/service";
import { authFetch } from "../lib/axios";

export async function getServices(params: { search?: string; page?: string }) {
  try {
    const { data } = await authFetch.get<PaginatedResponse<Service>>(
      "Service/all-services",
      {
        params: {
          search: params.search,
          page: params.page,
        },
      },
    );

    if (!data) {
      throw new Error("Failed to fetch services");
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching services");
  }
}

export async function getWorkFlows() {
  try {
    const { data } = await authFetch.get<ShortWorkFlow[]>(
      "Service/GetDefaultStatus",
    );

    if (!data) throw new Error("Failed to fetch workflows");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching workflows");
  }
}

export async function getForms() {
  try {
    const { data } = await authFetch.get<ServiceForm[]>("Service/All-Forms");

    if (!data) throw new Error("Failed to fetch forms");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching forms");
  }
}
