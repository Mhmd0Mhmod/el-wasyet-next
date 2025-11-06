import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "@/data/notifications";
import { markAllNotificationsAsRead } from "@/actions/notifications/actions";

function useNotification() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    initialData: [],
  });
  const mutation = useMutation({
    mutationKey: ["markAllAsRead"],
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
  return { query, mutation };
}
export { useNotification };
