import { getServiceById } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";
function useService(serviceId: number) {
  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => getServiceById(serviceId),
    enabled: !!serviceId,
  });

  return { service, isLoading, error };
}
export { useService };
