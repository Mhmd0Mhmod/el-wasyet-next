import {
  markAllNotificationsAsRead,
  markNotificationAsRead as markNotificationAsReadAction,
} from "@/actions/notifications/actions";
import { getNotifications } from "@/data/notifications";
import { Notification } from "@/types/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useNotification() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 60000,
    initialData: [],
  });
  const markNotificationAsRead = useMutation({
    mutationFn: markNotificationAsReadAction,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previous = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);

      queryClient.setQueryData(
        ["notifications"],
        (old: Notification[] | undefined) =>
          old?.map((n: Notification) =>
            n.notificationId === id ? { ...n, isRead: true } : n,
          ),
      );

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["notifications"], context?.previous);
      toast.error("Failed to mark as read");
    },
  });
  const markALLNotificationAsRead = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previous = queryClient.getQueryData<Notification[]>([
        "notifications",
      ]);
      queryClient.setQueryData(
        ["notifications"],
        (old: Notification[] | undefined) =>
          old?.map((n: Notification) => ({ ...n, isRead: true })),
      );
      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["notifications"], context?.previous);
      toast.error("Failed to mark all as read");
    },
  });
  return { query, markNotificationAsRead, markALLNotificationAsRead };
}
export { useNotification };
