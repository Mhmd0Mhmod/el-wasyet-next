import { useQuery } from "@tanstack/react-query";
import { searchClients } from "@/data/orders";
function useClients(searchTerm: string) {
  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients", searchTerm],
    queryFn: () => searchClients(searchTerm),
    enabled: searchTerm.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  console.log("refetcing clients");
  return { clients, isLoadingClients: isLoading, clientsError: error };
}
export { useClients };
