import { useQuery } from "@tanstack/react-query";
import { getStockForms } from "@/data/stock";

function useStockForms() {
  return useQuery<
    {
      id: string;
      name: string;
    }[]
  >({
    queryKey: ["stockForms"],
    queryFn: getStockForms,
  });
}
export default useStockForms;
