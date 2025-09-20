import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function getEmployees({
  search = null,
  page = 1,
}: {
  search?: string | null;
  page?: number;
} = {}): Promise<PaginatedResponse<ShortEmployee>> {
  const { data, error, message, success } = await fetchClient.get<
    PaginatedResponse<ShortEmployee>
  >(`Employee/all`, {
    query: {
      search: search,
      pageSize: defaults.pageSize,
      pageIndex: page,
    },
  });
  if (!success || error) throw new Error(message);

  return (
    data || {
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: defaults.pageSize,
    }
  );
}
