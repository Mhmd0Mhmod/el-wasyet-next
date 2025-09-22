import { Client, ShortClient } from "@/types/client";
import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function fetchClients({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
} = {}): Promise<PaginatedResponse<ShortClient>> {
  const { data, error, message } = await fetchClient.get<
    PaginatedResponse<ShortClient>
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
export async function fetchClientById(
  id: number,
  {
    params = { page: 1 },
  }: {
    params?: { page?: number };
  },
): Promise<Client> {
  const { data, error, message } = await fetchClient.get<Client>(
    `Client/${id}`,
    { query: params },
  );
  if (error) throw new Error(message || "Error fetching client");
  if (!data) throw new Error("Client not found");
  return data;
}
