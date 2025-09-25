import { getManagersBranches } from "@/data/branches";
import { useQuery } from "@tanstack/react-query";

export const useManagers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["managers"],
    queryFn: getManagersBranches,
  });
  return { data, isLoading, error };
};
