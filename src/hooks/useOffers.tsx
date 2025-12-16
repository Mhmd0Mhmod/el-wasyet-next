import { getOffers } from "@/data/orders";
import { useQuery } from "@tanstack/react-query";

function useOffers() {
  const {
    data: offers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });
  return { offers, isLoadingOffers: isLoading || isFetching };
}
export { useOffers };
