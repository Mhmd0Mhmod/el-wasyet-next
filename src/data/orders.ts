import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";
import { Client } from "@/types/client";
import { Agent, Offer, Order, OrderDetails, OrderLog } from "@/types/order";
import { Service } from "@/types/service";
import { AxiosError } from "axios";

export async function getOrders({
  searchParams,
}: {
  searchParams: Partial<{
    searchTerm?: string;
    page?: string;
    ServiceIds?: string;
    OrderStatusIds?: string;
  }>;
}): Promise<PaginatedResponse<Order>> {
  try {
    const orderStatusIds = searchParams?.OrderStatusIds?.split(",").map(Number);
    const serviceIds = searchParams?.ServiceIds?.split(",").map(Number);
    const res = await authFetch.get<PaginatedResponse<Order>>("Order/all", {
      params: {
        searchTerm: searchParams?.searchTerm || "",
        pageNumber: searchParams?.page || 1,
        OrderStatusIds: orderStatusIds,
        ServiceIds: serviceIds,
        PageSize: defaults.pageSize,
      },
    });

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
}

export async function getOrderById(id: string): Promise<OrderDetails> {
  try {
    const res = await authFetch.get<OrderDetails>(`Order/${id}/details`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
}

export async function getServices() {
  try {
    const res = await authFetch.get<Service[]>("/Order/getAll-Services");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
}

export async function getOrderStatuses() {
  try {
    const res = await authFetch.get<
      {
        id: number;
        name: string;
      }[]
    >("/Order/getAll-OrderStatues");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
}
export const searchClients = async (phoneNumber: string): Promise<Client[]> => {
  if (!phoneNumber?.trim()) return [];

  const response = await authFetch.get<Client[]>(`/Order/get-Clients`, {
    params: { phoneNumber },
  });
  return response.data;
};
export const getOrdersTypes = async () => {
  try {
    const res = await authFetch.get<Service[]>("/Order/getAll-Services");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
};

export const getOffers = async () => {
  try {
    const res = await authFetch.get<Offer[]>("Order/getAll-Offers");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
};

export const getAgents = async () => {
  try {
    const res = await authFetch.get<Agent[]>("/Order/getAll-Agents");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
};
export const getServiceById = async (ServiceId: number) => {
  try {
    const res = await authFetch.get<Service>("/Order/get-Service", {
      params: { ServiceId },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
};

export async function getOrderLogs({
  id,
  search,
  page,
}: {
  id: number;
  search: string;
  page: number;
}): Promise<OrderLog[]> {
  try {
    const { data } = await authFetch.get<OrderLog[]>(`/Order/${id}/audits`);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = Object.values(err.response?.data.errors || {})
        .flat()
        .join(" ");
      throw new Error(errors || err.response?.data?.message || err.message);
    }
    if (err instanceof Error) throw new Error(err.message);

    throw new Error("An unexpected error occurred");
  }
}
