import { authFetch } from "@/lib/axios";
import { defaults } from "@/lib/utils";
import { Order } from "@/types/order";
import { AxiosError } from "axios";

export async function getOrders({
  searchParams,
}: {
  searchParams: Partial<{
    searchTerm?: string;
    page?: string;
    ServiceId?: string;
    OrderStatusIds?: string;
  }>;
}): Promise<PaginatedResponse<Order>> {
  try {
    const res = await authFetch.get<PaginatedResponse<Order>>("Order/all", {
      params: {
        ...searchParams,
        OrderStatusIds: 4,
        pageSize: defaults.pageSize,
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
