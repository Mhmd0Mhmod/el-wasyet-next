export interface Notification {
  notificationId: number;
  message: string;
  type: string;
  date: string;
  isRead: boolean;
  isRequestStock: boolean;
  isRequest: boolean;
  requestId: number | null;
  requestStockId: number | null;
}
