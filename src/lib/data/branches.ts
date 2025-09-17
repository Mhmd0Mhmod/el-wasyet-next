import { Branch } from "../types/branch";
import { fetchClient } from "../fetch";

export async function getBranches(
  params: Record<string, string | string[] | undefined>
) {
  const query = new URLSearchParams(params.toString());
  const response = await fetchClient.get<{ data: Branch[]; total: number }>(
    `branches?${query.toString()}`
  );
  return response;
}
