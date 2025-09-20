import { fetchClient } from "../fetch";
import { defaults } from "../utils";

export async function fetchClients({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
} = {}) {
  const { data, error, message } = await fetchClient.get<Client[]>(
    "Client/all",
    {
      query: {
        search,
        pageIndex: page,
        pageSize: defaults.pageSize,
      },
    },
  );

  if (error) throw new Error(message || "Error fetching clients");
  console.log(data);
  return data || [];
}
