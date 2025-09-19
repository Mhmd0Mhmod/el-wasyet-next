import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function getEmployees({
  search = null,
  pageNumber = 1,
}: {
  search?: string | null;
  pageNumber?: number;
} = {}): Promise<ShortEmployee[]> {
  const { data, error, message, success } = await fetchClient.get<
    ShortEmployee[]
  >(`Employee/all`, {
    query: {
      search: search,
      pageSize: defaults.pageSize,
      pageIndex: pageNumber,
    },
  });
  if (!success || error) throw new Error(message);

  return data || [];
}
