import { Branch } from "../types/branch";
import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function getBranches({
  search,
  page,
}: {
  search?: string;
  page?: number;
}): Promise<Branch[]> {
  const { data, error, message } = await fetchClient.get<Branch[]>(
    "Branch/all",
    {
      query: {
        search,
        page,
        pageSize: defaults.pageSize,
      },
    },
  );
  if (error) {
    throw new Error(message);
  }
  return data || [];
}

export async function getBranchById(id: string): Promise<Branch | null> {
  const { data, error, message } = await fetchClient.get<Branch | null>(
    `Branch/${id}`,
  );
  if (error) {
    throw new Error(message);
  }
  return data;
}
