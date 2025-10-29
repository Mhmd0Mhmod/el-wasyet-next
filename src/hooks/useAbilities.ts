import { getAbilitiesByRole } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function useAbilities(role: Role) {
  const {
    data: abilities,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["abilities", role?.id, role?.name],
    queryFn: () =>
      getAbilitiesByRole({
        id: role?.id,
        name: role?.name,
      }),
    initialData: [],
    enabled: !!role?.id,
  });
  useEffect(() => {
    if (role?.id) {
      refetch();
    }
  }, [role, refetch]);
  return { abilities, isLoading: isFetching, error };
}
export default useAbilities;
