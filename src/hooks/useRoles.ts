import { getRoles } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useRoles() {
  const query = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: "static",
  });
  return {
    roles: query.data,
    isLoading: query.isLoading,
    error: query.error,
    initalData: [],
  };
}
export { useRoles };
