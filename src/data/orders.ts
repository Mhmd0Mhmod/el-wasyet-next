import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";
import { Client } from "@/types/client";
import {
  Agent,
  Offer,
  Order,
  OrderByStatus,
  OrderDetails,
  OrderLog,
} from "@/types/order";
import { OrderAction } from "@/types/order-actions";
import { Service } from "@/types/service";
import { AxiosError } from "axios";
// cacheTag removed — this module is used by client-side hooks

export async function getOrders({
  searchParams,
}: {
  searchParams: Partial<{
    search?: string;
    page?: string;
    serviceIds?: string;
    orderStatusIds?: string;
    colorId?: string;
  }>;
}): Promise<PaginatedResponse<Order>> {
  try {
    const orderStatusIds = searchParams?.orderStatusIds?.split(",").map(Number);
    const serviceIds = searchParams?.serviceIds?.split(",").map(Number);
    const params = new URLSearchParams();
    if (searchParams?.search) {
      params.append("search", searchParams.search);
    }
    if (searchParams?.page) {
      params.append("pageNumber", searchParams.page);
    } else {
      params.append("pageNumber", "1");
    }
    if (orderStatusIds && orderStatusIds.length > 0) {
      orderStatusIds.forEach((id) =>
        params.append("orderStatusIds", id.toString()),
      );
    }
    if (searchParams?.colorId) {
      params.append("colorId", searchParams.colorId);
    }
    if (serviceIds && serviceIds.length > 0) {
      serviceIds.forEach((id) => params.append("serviceIds", id.toString()));
    }
    params.append("PageSize", defaults.pageSize.toString());
    const res = await authFetch.get<PaginatedResponse<Order>>("Order/all", {
      params,
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

export async function getOrdersByStatusIds(params: {
  orderStatusIds: number[];
  IsCertificate?: boolean | null;
  searchTerm?: string;
  pageNumber?: number;
  serviceIds?: string[];
}): Promise<
  Omit<PaginatedResponse<OrderByStatus[]>, "items"> & {
    items: {
      orders: OrderByStatus[];
      totalExpenses: number;
    };
  }
> {
  try {
    const { data } = await authFetch.get<
      Omit<PaginatedResponse<OrderByStatus[]>, "items"> & {
        items: {
          orders: OrderByStatus[];
          totalExpenses: number;
        };
      }
    >(`/Order/GetBy-Status`, {
      params,
    });
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

export function getOrderActions({
  canSelectAll = false,
  pathname,
}: {
  canSelectAll?: boolean;
  pathname: string;
}): OrderAction[] {
  const path = pathname.toLowerCase();
  if (
    path.includes("pending-orders") ||
    path.includes("pending-certificates")
  ) {
    const response = [OrderAction.NEW_ORDER];
    return response;
  }
  if (path.includes("new-orders") || path.includes("new-certificates")) {
    return [OrderAction.ASK_EXPENSES];
  }
  if (path.includes("collected")) {
    const response = [
      OrderAction.UNDER_PROCESSING,
      OrderAction.STEFA_CLIENT,
      OrderAction.STEFA_CERTIFICATE,
    ];
    if (canSelectAll) {
      return response;
    }
    response.push(OrderAction.RETURN);
    return response;
  }
  if (path.includes("in-progress")) {
    const response = [OrderAction.COMPLETED, OrderAction.STEFA_SGL];
    return response;
  }
  if (path.includes("completed-orders")) {
    return [OrderAction.CONTACTED];
  }

  if (path.includes("order-receipt")) {
    return [
      OrderAction.SEND_CODE,
      OrderAction.WRITE_CODE,
      OrderAction.RECEIVING_DONE,
    ];
  }
  if (path.includes("fulfillment")) {
    const response = [OrderAction.COLLECTION_DONE];
    return response;
  }

  return [];
}
