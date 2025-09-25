import { AxiosError } from "axios";
import { Client, ShortClient } from "@/types/client";
import { authFetch } from "../lib/axios";
import { defaults } from "../lib/utils";

export async function getClients({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
} = {}): Promise<PaginatedResponse<ShortClient>> {
  try {
    const { data } = await authFetch.get<PaginatedResponse<ShortClient>>(
      "Client/all",
      {
        params: {
          search,
          pageIndex: page,
          pageSize: defaults.pageSize,
        },
      },
    );

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
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching clients");
  }
}

export async function getClientById(
  id: number,
  {
    params = { page: 1 },
  }: {
    params?: { page?: number };
  } = {},
): Promise<Client> {
  try {
    const { data } = await authFetch.get<Client>(`Client/${id}`, { params });

    if (!data) throw new Error("Client not found");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    throw new Error("An unexpected error occurred while fetching client");
  }
}
