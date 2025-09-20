import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function fetchClients({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
} = {}): Promise<PaginatedResponse<Client>> {
  const { data, error, message } = await fetchClient.get<
    PaginatedResponse<Client>
  >("Client/all", {
    query: {
      search,
      pageIndex: page,
      pageSize: defaults.pageSize,
    },
  });

  if (error) throw new Error(message || "Error fetching clients");

  return (
    data || {
      items: [],
      totalRecords: 0,
      pageNumber: 1,
      pageSize: defaults.pageSize,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    }
  );
}
