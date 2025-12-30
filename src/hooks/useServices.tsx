import { getServices } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";

function useServices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: 5 * 60 * 1000,
  });
  return { services: data, isLoadingServices: isLoading, error };
}
export { useServices };
