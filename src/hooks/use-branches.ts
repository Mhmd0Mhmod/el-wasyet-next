import { getBranchesAuth } from "@/data/branches";
import { useQuery } from "@tanstack/react-query";

function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getBranchesAuth,
  });
}

export { useBranches };
