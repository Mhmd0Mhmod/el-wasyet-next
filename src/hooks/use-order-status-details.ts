import { getOrdersByStatusDetails } from "@/data/dashboard";
import { OrderByStatusDetail } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

function useOrderStatusDetails(props: {
  orderStatusId: number;
  dates: { fromDate?: string; toDate?: string };
  pageNumber?: number;
}) {
  const queryfn = useCallback(async () => {
    const response = await getOrdersByStatusDetails(
      props.orderStatusId,
      props.dates,
      props.pageNumber,
    );
    return response;
  }, [props.orderStatusId, props.dates, props.pageNumber]);

  return useQuery({
    queryKey: [
      "order-status-details",
      props.orderStatusId,
      props.dates.fromDate,
      props.dates.toDate,
      props.pageNumber,
    ],
    queryFn: queryfn,
    enabled: !!props.orderStatusId,
    initialData: {} as PaginatedResponse<OrderByStatusDetail>,
  });
}
export default useOrderStatusDetails;
