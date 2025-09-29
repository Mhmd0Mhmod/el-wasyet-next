import { getAgents } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";

function useAgents() {
  const { data: agents, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });
  return { agents, isLoadingAgents: isLoading };
}
export { useAgents };
