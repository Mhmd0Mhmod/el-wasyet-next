import { getOrderLogs } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";

function useOrderLogs({
  orderId,
  page,
  search,
}: {
  orderId: number;
  page: number;
  search: string;
}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["orderLogs", orderId, page, search],
    queryFn: () => getOrderLogs({ id: orderId, page, search }),
    enabled: !!orderId,
    initialData: [],
  });
  return { orderLogs: data, isLoading: isLoading || isFetching, error };
}
export { useOrderLogs };
