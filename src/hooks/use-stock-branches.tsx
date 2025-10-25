import { useQuery } from "@tanstack/react-query";
import { getStockBranches } from "@/data/stock";

function useStockBranches() {
  return useQuery<
    {
      id: string;
      name: string;
    }[]
  >({
    queryKey: ["stockBranches"],
    queryFn: getStockBranches,
  });
}
export default useStockBranches;
