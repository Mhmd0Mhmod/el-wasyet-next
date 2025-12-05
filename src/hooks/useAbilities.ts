import { getAbilitiesByRole } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useAbilities(role?: Role) {
  const {
    data: abilities,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["abilities", role],
    queryFn: () => getAbilitiesByRole(role!),
    initialData: [],
    enabled: !!role?.id,
    staleTime: "static",
  });

  return { abilities, isLoading: isFetching, error };
}
export default useAbilities;
