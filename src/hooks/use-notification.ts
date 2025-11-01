import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/data/notifications";

function useNotification() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    initialData: [],
  });
}
export { useNotification };
