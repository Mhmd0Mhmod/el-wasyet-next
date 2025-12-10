"use server";

import { authFetch } from "@/lib/axios";
import { handleErrorResponse } from "@/actions/helper";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../auth/actions";

export async function markAllNotificationsAsRead(): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch("Notification/make-all-read");
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export async function markNotificationAsRead(
  notificationId: number,
): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.patch(
      `Notification/${notificationId}/mark-as-read`,
    );
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function approveRequestNotification({
  notificationId,
  requestId,
  Remainingvalue = null,
}: {
  notificationId: number;
  requestId: number;
  Remainingvalue?: string | null;
}): Promise<APIResponse<void>> {
  try {
    const employeeId = (await getCurrentUser())?.userId;
    if (!employeeId) {
      throw new Error("User not authenticated");
    }
    const response = await authFetch.post(
      `/Request/approve/${requestId}`,
      Remainingvalue,
    );
    await markNotificationAsRead(notificationId);
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data.message,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestNotification({
  notificationId,
  requestId,
  reason,
}: {
  notificationId: number;
  requestId: number;
  reason?: string;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.post(
      `/Request/reject/${requestId}`,
      reason,
    );
    await markNotificationAsRead(notificationId);
    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function approveRequestStockNotification({
  requestStockId,
  notificationId,
  Remainingvalue = null,
}: {
  notificationId: number;
  requestStockId: number;
  Remainingvalue?: string | null;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.post(
      `RequestStock/ApproveTheRequest/${requestStockId}`,
      Remainingvalue,
    );
    await markNotificationAsRead(notificationId);

    revalidateTag("notifications");
    return {
      success: true,
      data: response.data.message,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}
export async function rejectRequestStockNotification({
  notificationId,
  requestStockId,
  reason,
}: {
  notificationId: number;
  requestStockId: number;
  reason?: string;
}): Promise<APIResponse<void>> {
  try {
    const response = await authFetch.post(
      `RequestStock/RejectTheRequest/${requestStockId}`,
      reason,
    );
    await markNotificationAsRead(notificationId);

    revalidateTag("notifications");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export const revalidateNotifications = async () => {
  revalidateTag("notifications");
};
