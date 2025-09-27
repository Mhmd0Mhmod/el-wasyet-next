import { getRoles } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useRoles() {
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
  return {
    roles: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
export { useRoles };
