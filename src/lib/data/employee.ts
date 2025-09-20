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
      totalPages: 0,
      pageSize: defaults.pageSize,
      pageNumber: page,
      hasNextPage: false,
      hasPreviousPage: false,
      totalRecords: 0,
    }
  );
}
