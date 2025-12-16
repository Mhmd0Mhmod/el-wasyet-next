import { getServiceById } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";
function useService(serviceId: number) {
  const {
    data: service,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => getServiceById(serviceId),
    enabled: !!serviceId,
  });

  return { service, isLoading: isLoading || isFetching, error };
}
export { useService };
