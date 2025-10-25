import { getRequestStatusData } from "@/data/dashboard";
import { useQuery } from "@tanstack/react-query";

function useRequestStatus() {
  return useQuery({
    queryKey: ["request-status"],
    queryFn: getRequestStatusData,
  });
}

export default useRequestStatus;
