import { getClientById } from "@/data/clients";
import { useQuery } from "@tanstack/react-query";

function useClient(clientId: number) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  });
  return {
    client: data,
    isLoading: isFetching,
    error,
  };
}
export { useClient };
