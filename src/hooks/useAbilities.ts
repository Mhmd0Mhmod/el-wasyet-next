import { getAbilitiesByRole } from "@/data/employee";
import { useQuery } from "@tanstack/react-query";

function useAbilities(role: Role) {
  const { data: abilities } = useQuery({
    queryKey: ["abilities", role?.id, role?.name],
    queryFn: () =>
      getAbilitiesByRole({
        id: role?.id,
        name: role?.name,
      }),
    initialData: [],
    enabled: !!role?.id,
  });
  return { abilities };
}
export default useAbilities;
