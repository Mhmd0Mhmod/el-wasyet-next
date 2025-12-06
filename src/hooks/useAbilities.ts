import { getAbilitiesByRole } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useAbilities(role: Role | undefined) {
  const query = useQuery({
    queryKey: ["abilities", role],
    queryFn: () => getAbilitiesByRole(role!),
    enabled: !!role?.id,
    staleTime: "static",
  });

  return query;
}
export default useAbilities;
