import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "@/data/notifications";
import { markAllNotificationsAsRead } from "@/actions/notifications/actions";
import { toast } from "sonner";

function useNotification() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 60000,
    initialData: [],
  });
  const mutation = useMutation({
    mutationKey: ["markAllAsRead"],
    mutationFn: markAllNotificationsAsRead,

    onSuccess: () => {
      toast.success("تم تعليم جميع الإشعارات كمقروءة.");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: Error) => {
      toast.error(
        "حدث خطأ ما أثناء تعليم جميع الإشعارات كمقروءة: " + error.message,
      );
    },
  });
  return { query, mutation };
}
export { useNotification };
