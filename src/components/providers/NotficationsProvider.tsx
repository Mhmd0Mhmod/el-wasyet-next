"use client";
import { useNotification as useNotificationQuery } from "@/hooks/use-notification";
import { Notification } from "@/types/notification";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useOptimistic,
  useTransition,
} from "react";
import { toast } from "sonner";
import {
  approveRequestNotification,
  markNotificationAsRead as markNotificationAsReadAction,
  rejectRequestNotification,
} from "@/actions/notifications/actions";

type APIResponse<T = undefined> =
  | { success: true; message?: string; data: T }
  | { success: false; message: string; data?: T };

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isFetching: boolean;
  markAllAsRead: UseMutateAsyncFunction<
    APIResponse<void>,
    Error,
    void,
    unknown
  >;
  markAsRead: (notificationId: number) => Promise<void>;
  refetch: () => void;

  confirmFullAcceptanceNotificationRequest: (
    notification: Notification,
  ) => Promise<APIResponse<void>>;
  confirmPartialAcceptanceNotificationRequest: (
    notification: Notification,
    remainingValue: number,
  ) => Promise<APIResponse<void>>;
  rejectNotificationRequest: (
    notification: Notification,
    reason: string,
  ) => Promise<APIResponse<void>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const {
    query: { data: notifications = [], isLoading, refetch },
    mutation: { mutateAsync: markAllAsRead },
  } = useNotificationQuery();

  const [isPending, startTransition] = useTransition();
  const [optimisticNotifications, setOptimisticNotifications] = useOptimistic(
    notifications,
    (state, notificationId: number) => {
      return state.map((n) =>
        n.notificationId === notificationId ? { ...n, isRead: true } : n,
      );
    },
  );

  const unreadCount = optimisticNotifications.filter((n) => !n.isRead).length;

  const markAsRead = useCallback(
    async (notificationId: number) => {
      startTransition(() => {
        setOptimisticNotifications(notificationId);
      });
      try {
        const result = await markNotificationAsReadAction(notificationId);
        if (!result.success) {
          toast.error(result.message || "فشل تحديث حالة الإشعار");
        }
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch {
        toast.error("حدث خطأ أثناء تحديث حالة الإشعار");
        refetch();
      }
    },
    [queryClient, refetch, setOptimisticNotifications],
  );
  const confirmFullAcceptanceNotificationRequest = useCallback(
    async (notification: Notification) => {
      return await approveRequestNotification({
        requestId: notification.requestId!,
        notificationId: notification.notificationId,
      });
    },
    [],
  );
  const confirmPartialAcceptanceNotificationRequest = useCallback(
    async (notification: Notification, remainingValue: number) => {
      return await approveRequestNotification({
        requestId: notification.requestId!,
        Remainingvalue: remainingValue,
        notificationId: notification.notificationId,
      });
    },
    [],
  );
  const rejectNotificationRequest = useCallback(
    async (notification: Notification, reason: string) => {
      return await rejectRequestNotification({
        requestId: notification.requestId!,
        notificationId: notification.notificationId,
        reason,
      });
    },
    [],
  );
  return (
    <NotificationContext.Provider
      value={{
        notifications: optimisticNotifications,
        unreadCount,
        isFetching: isLoading,
        markAllAsRead,
        markAsRead,
        refetch,
        confirmFullAcceptanceNotificationRequest,
        confirmPartialAcceptanceNotificationRequest,
        rejectNotificationRequest,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider",
    );
  }
  return context;
}
