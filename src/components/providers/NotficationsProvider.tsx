"use client";
import {
  approveRequestNotification,
  approveRequestStockNotification,
  markNotificationAsRead as markNotificationAsReadAction,
  rejectRequestNotification,
  rejectRequestStockNotification,
} from "@/actions/notifications/actions";
import { useNotification as useNotificationQuery } from "@/hooks/use-notification";
import { Notification } from "@/types/notification";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useTransition,
} from "react";
import { toast } from "sonner";

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
    remainingValue: string,
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
  open = false,
  children,
}: {
  open?: boolean;
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const {
    query: { data: notifications = [], isFetching, isLoading, refetch },
    mutation: { mutateAsync: markAllAsRead },
  } = useNotificationQuery();

  // Refetch notifications when dialog opens
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  const [, startTransition] = useTransition();
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
      if (notification.isRequest && !notification.isRequestStock)
        return await approveRequestNotification({
          requestId: notification.requestId!,
          notificationId: notification.notificationId,
        });

      if (notification.isRequestStock && !notification.isRequest)
        return await approveRequestStockNotification({
          requestStockId: notification.requestStockId!,
          notificationId: notification.notificationId,
        });

      throw new Error("Invalid notification type for approval");
    },
    [],
  );
  const confirmPartialAcceptanceNotificationRequest = useCallback(
    async (notification: Notification, remainingValue: string) => {
      if (notification.isRequest && !notification.isRequestStock)
        return await approveRequestNotification({
          requestId: notification.requestId!,
          Remainingvalue: remainingValue,
          notificationId: notification.notificationId,
        });
      if (notification.isRequestStock && !notification.isRequest)
        return await approveRequestStockNotification({
          requestStockId: notification.requestStockId!,
          notificationId: notification.notificationId,
          Remainingvalue: remainingValue,
        });
      throw new Error("Invalid notification type for approval");
    },
    [],
  );
  const rejectNotificationRequest = useCallback(
    async (notification: Notification, reason: string) => {
      if (notification.isRequest && !notification.isRequestStock)
        return await rejectRequestNotification({
          requestId: notification.requestId!,
          notificationId: notification.notificationId,
          reason,
        });
      if (notification.isRequestStock && !notification.isRequest)
        return await rejectRequestStockNotification({
          requestStockId: notification.requestStockId!,
          notificationId: notification.notificationId,
          reason,
        });
      throw new Error("Invalid notification type for rejection");
    },
    [],
  );
  return (
    <NotificationContext.Provider
      value={{
        notifications: optimisticNotifications,
        unreadCount,
        isFetching: isLoading || isFetching,
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
