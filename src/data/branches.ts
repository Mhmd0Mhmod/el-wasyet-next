import { AxiosError } from "axios";
import { authFetch, fetch } from "../lib/axios";
import { Branch, ShortBranch } from "../types/branch";

export async function getBranches({
  search,
}: {
  search?: string;
}): Promise<Branch[]> {
  try {
    const { data } = await authFetch.get<Branch[]>("Branch/all", {
      params: {
        searchTerm: search || "",
      },
    });

    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getBranchById(id: string): Promise<Branch> {
  try {
    const { data } = await authFetch.get<Branch>(`Branch/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getBranchesAuth(): Promise<ShortBranch[]> {
  try {
    const { data } = await fetch.get<ShortBranch[]>("Auth/branches");
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }

    throw new Error("An unexpected error occurred");
  }
}

export async function getManagersBranches() {
  try {
    const { data } = await authFetch.get<ShortManager[]>("Employee/managers");
    return data || [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred");
  }
}
