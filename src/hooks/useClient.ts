import { getClientById } from "@/data/clients";
import { useQuery } from "@tanstack/react-query";

function useClient(clientId: number) {
  const query = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  });
  return {
    client: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
export { useClient };
