import { getClientById } from "@/data/clients";
import { useQuery } from "@tanstack/react-query";

function useClient(clientId: number, pageIndex: number = 1) {
  const query = useQuery({
    queryKey: ["client", clientId, pageIndex],
    queryFn: () => getClientById(clientId, { params: { pageIndex } }),
    enabled: !!clientId,
  });
  return {
    client: query.data,
    isLoading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
export { useClient };
