import { searchClients } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";
function useClients(searchTerm: string) {
  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients", searchTerm],
    queryFn: () => searchClients(searchTerm),
    enabled: searchTerm.length === 11 || searchTerm.length === 14,
    staleTime: 5 * 60 * 1000,
  });
  return { clients, isLoadingClients: isLoading, clientsError: error };
}
export { useClients };
