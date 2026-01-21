"use client";
import { useNotification } from "@/hooks/use-notification";
import { Notification } from "@/types/notification";
import { createContext, useContext } from "react";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (notificationId: number) => void;
  isFetchingNotifications: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { query, markNotificationAsRead, markALLNotificationAsRead } =
    useNotification();
  const notifications = query.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isFetchingNotifications: query.isFetching,
        markAllAsRead: markALLNotificationAsRead.mutate,
        markAsRead: markNotificationAsRead.mutate,
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
